// Angular
import {
	Component,
	HostListener,
	QueryList,
	ViewChildren,
	ViewEncapsulation,
	OnInit,
	OnDestroy,
	AfterViewInit,
	Renderer2, 
	ViewChild,
	ElementRef
} from '@angular/core';
// Service
import { EventService } from '../../../service/event-service/event.service';
// Component
import { DynamicHostComponent } from '../dynamic-host/dynamic-host.component';
// Model
import { DialogEventType } from '../../model/dialog.model';
import { Dialog } from '../../model/dialog.interface';
import { DynamicHostModel } from '../../model/dynamic-host.model';
// Other
import { Subscription } from 'rxjs';
import { EVENT_DIALOG } from './../../model/focus.model';
import { DialogService } from './../../service/dialog.service';
@Component({
	selector: 'tds-dialog',
	styleUrls: ['./dialog.component.scss'],
	encapsulation: ViewEncapsulation.None,
	templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChildren(DynamicHostComponent) dynamicHostList!: QueryList<DynamicHostComponent>;
	@ViewChild('modal', {static: true}) modalElement: any;

	// Contains a list of every available dialog open as an Stack
	public dynamicDialogList: DynamicHostModel[] = <any>[];
	public dropdownActivated = false;
	private arrClicked: string[] = [];
	private lastElementClicked = null;
	private dialogEscape = false;
	public dropdownSub: Subscription;
	// QueryList does not provides a proper way to get new elements
	private newDialog = false;
	private lastElementTabbed: any;
	private tabbedElementChildren: any;
	private hFlow: boolean;
	private vFlow: boolean;

	constructor(private eventService: EventService, private dialogService: DialogService, private renderer: Renderer2) {
		this.registerDialog();
	}

	ngOnInit(): void {
		this.dropdownSub = this.dialogService.activatedDropdown.subscribe(didActivate => {
			this.dropdownActivated = didActivate;
		});
	}

	/**
	 * documentation needed here
	 * **/
	ngAfterViewInit(): void {
		// Wait to be registered
		this.dynamicHostList.changes.subscribe((dynamicHostComponent: any) => {
			setTimeout(() => {
				// We get the lasted change added
				if (
					this.newDialog &&
					dynamicHostComponent &&
					!dynamicHostComponent.last.currentDialogComponentInstance
				) {
					this.newDialog = false;
					if (this.dynamicDialogList) {
						const dynamicHostModel = this.dynamicDialogList[this.dynamicDialogList.length - 1];
						// Save to the List which host component is attached
						dynamicHostModel.dynamicHostComponent = this.dynamicHostList.last;
						this.createComponent(dynamicHostModel);
					}
				}
			});
		});
	}

	/**
	 * Register the event, so it can be listen to on open events or clear current instance
	 */
	public registerDialog(): void {
		this.eventService.on(DialogEventType.OPEN, (dialogModel: any) => {
			this.newDialog = true;
			// We initialize the Model with the incoming Model event
			const dynamicHostModel: DynamicHostModel = {
				dialogModel: dialogModel.event,
				instantiated: false,
			};

			// We add a new Empty element to the dynamicDialogList
			this.dynamicDialogList.push(dynamicHostModel);
		});
	}

	/**
	 * Create the component and clear previous data on it
	 * @param componentFactoryResolver
	 */
	public createComponent(dynamicHostModel: DynamicHostModel): void {
		try {
			// Create new instance
			const componentFactory = dynamicHostModel.dialogModel.componentFactoryResolver.resolveComponentFactory(
				dynamicHostModel.dialogModel.component
			);
			const currentViewContainerRef = dynamicHostModel.dynamicHostComponent.dynamicContent.viewContainerRef;
			currentViewContainerRef.clear();
			const componentRef = currentViewContainerRef.createComponent(componentFactory);

			const currentDialogComponentInstance = <Dialog>componentRef.instance;
			currentDialogComponentInstance.data = dynamicHostModel.dialogModel.data;
			currentDialogComponentInstance.content = dynamicHostModel.dialogModel.content;
			currentDialogComponentInstance.buttons = [];

			// Overwrite the property configuration
			if (dynamicHostModel.dialogModel.modalConfiguration) {
				dynamicHostModel.dynamicHostComponent.modalConfigurationModel = Object.assign(
					dynamicHostModel.dynamicHostComponent.modalConfigurationModel,
					dynamicHostModel.dialogModel.modalConfiguration
				);
				// If the user wants to set the background as empty, we change the default so we can revert it to that
				if (!dynamicHostModel.dynamicHostComponent.modalConfigurationModel.showBackground) {
					dynamicHostModel.dynamicHostComponent.modalConfigurationModel.setDefaultShowBackground(
						dynamicHostModel.dynamicHostComponent.modalConfigurationModel.showBackground
					);
				}
			}

			// Save the instance
			dynamicHostModel.dynamicHostComponent.currentDialogComponentInstance = currentDialogComponentInstance;

			// Before to open the Dialog, we hide any other background
			this.showHideBackgrounds();

			// Emits on Success
			if (currentDialogComponentInstance.successEvent) {
				
				currentDialogComponentInstance.successEvent.subscribe(result => {
					this.dropdownSub = this.dialogService.activatedDropdown.subscribe(res => {						
						this.dropdownActivated = res;
						this.dropdownSub.unsubscribe();
					});
					if (this.dropdownActivated === true) {
						if (this.lastElementClicked) {
							if (this.renderer) {
								this.renderer.setAttribute(
									this.lastElementClicked,
									'tabindex',
									'0'
								);	
							}
							this.dropdownActivated = false;
							this.dialogService.activatedDropdown.next(false);
							return;	
						}
					} else {
						if (this.dropdownActivated === false) {
							dynamicHostModel.dialogModel.observable.next(result);
							dynamicHostModel.dialogModel.observable.complete();							
							// Last element of the array only
							this.dynamicDialogList.pop();
							setTimeout(() => {
								// After close a Dialog, we show any other background
								this.showHideBackgrounds();
							});
						}
					}
				});
			}

			if (currentDialogComponentInstance.extraActionEvent) {
				currentDialogComponentInstance.extraActionEvent.subscribe((eventType: any) => {
					if (eventType.event === EVENT_DIALOG.FOCUS) {
						this.setupFocus(currentViewContainerRef, eventType.element);
					}
				});
			}

			setTimeout(() => {
				dynamicHostModel.dynamicHostComponent.publishDialog();
				dynamicHostModel.instantiated = true;
			});

			// Assign tab indexes to dialog controls
			setTimeout(() => {
				const rowElement = document.querySelector('.modal-body div > form .clr-row');
				this.hFlow = document.querySelector('[tabflow="horizontal"]') !== null;
				this.vFlow = document.querySelector('[tabflow="vertical"]') !== null;
				if (this.hFlow) {
					if (rowElement) {
						const columns = document.querySelectorAll('.modal-body div > form .clr-row > [class^="clr-col"]');
						const indexMatrix = Array(columns.length);
						if (columns.length > 0) {
							Array.from(columns).forEach((column: any, index: number) => {
								const controlCount = Array.from(column.querySelectorAll('.modal-content .form-control, tds-button')).length;
								indexMatrix[index] = (Array(controlCount).fill(1));
							});
							const formControlsTabIndexes = document.querySelectorAll('.modal-body div > form .clr-row > [class^="clr-col-"] [tabindex]');
							Array.from(formControlsTabIndexes).forEach((element: any) => {
								element.setAttribute('tabindex', -1);
							});
							let maxTabIndex = 0;
							Array.from(columns).forEach((column: any, index: number) => {
								const formControls = column.querySelectorAll('.modal-content .form-control, tds-button');
								Array.from(formControls).forEach((element: any, controlIndex: number) => {
									// Assign the corresponding tab index based on the position matrix
									const tabIndex = (indexMatrix[index][controlIndex]) ? index + (columns.length * controlIndex) : -1;
									maxTabIndex = (tabIndex > maxTabIndex) ? tabIndex : maxTabIndex;
									element.setAttribute('tabindex', tabIndex);
								});
							});
							// Set the index for the buttons. A timeout is used so the sidenav component is available when the operations are performed
							setTimeout(() => {
								const formButtons = document.querySelectorAll('.modal-content form tds-button');
								const footerButtons = document.querySelectorAll('.modal-footer tds-button');
								const sidebarButtons = document.querySelectorAll('.modal-sidenav tds-button');
								Array.from(formButtons).forEach((element: any, buttonIndex: number) => {
									element.children[0].setAttribute('tabindex', element.getAttribute('tabindex'));
									element.setAttribute('tabindex', -1);
								});
								Array.from(footerButtons).forEach((element: any, buttonIndex: number) => {
									maxTabIndex = maxTabIndex + (buttonIndex + 1);
									element.children[0].setAttribute('tabindex', maxTabIndex);
									element.setAttribute('tabindex', -1);
								});
								Array.from(sidebarButtons).forEach((element: any, buttonIndex: number) => {
									maxTabIndex = maxTabIndex + (buttonIndex + 1);
									const child = element.children[0];
									child.setAttribute('tabindex', maxTabIndex);
									element.setAttribute('tabindex', -1);
								});
							});
						}
					}
				}
			});
		} catch (e) {
			console.error("Dialog can't be instantiated/created", e);
		}
	}

	/**
	 * This method will help to setup the focus to the first input, placing the cursor indicator
	 * **/
	private setupFocus(currentViewContainerRef: any, element: ElementRef): void {
			if (element && element.nativeElement) {
				element.nativeElement.focus();
			}
	}

	/**
	 * Function that pushes to the string array of click events
	 */
	private pushToArray(tagnamed: string): void {
		this.arrClicked.push(tagnamed);
		this.dialogService.activatedDropdown.next(true);
	}

	/**
	 * Function that pop the string array of click events
	 */
	private popFromArray(): void {
		if (this.arrClicked) {
			if (this.arrClicked.length > 0) {
				this.arrClicked.pop();
				this.dialogService.activatedDropdown.next(false);
			}	
		}
	}

	/**
	 * Capture click event
	 */
	@HostListener('document:click', ['$event'])
	public onClicker(event: any): void {
		let isDone = false;
		let kDropdownInterval = null;
		this.dropdownActivated = false;		
		this.popFromArray();
		
		const pushIsDone = (currentElement) => {
			this.pushToArray(event.target.tagName);
			this.dropdownActivated = true;
			isDone = true;
			this.lastElementClicked = currentElement;
		};

		const startDropdownInterval = (theTag) => { 
			const trackDropdown = () => {
				this.dialogService.activatedDropdown.next(true);
				if (document.getElementsByTagName(theTag)) {
					if (document.getElementsByTagName(theTag).length === 0) {
						clearInterval(kDropdownInterval);
						setTimeout(() => {
							this.popFromArray();
						}, 900);
					}
				}
			};
			kDropdownInterval = setInterval(trackDropdown.bind(this), 400);
		};

		if (event.target) {
			if (document.getElementsByTagName('kendo-popup')) {
				if (document.getElementsByTagName('kendo-popup').length > 0) {
					startDropdownInterval('kendo-popup');
					pushIsDone(event.target);
				}
			}

			if (document.getElementsByTagName('clr-datepicker-view-manager')) {
				if (document.getElementsByTagName('clr-datepicker-view-manager').length > 0) {
					startDropdownInterval('clr-datepicker-view-manager');
					pushIsDone(event.target);
				}
			}			
		}

		if (isDone === false) {
			this.dialogService.activatedDropdown.next(false);
		}
	}

	/**
	 * Determines if the esc was made over a composite component opened, like the date picker
	 * @param element
	 */
	isEscapeOverCompositeComponent(element: any): boolean {
		// example with the datepicker
		const bannedClasses = ['datepicker'];
		const classList = element && element.classList;

		if (element && classList) {
			let belongsToBannedClass = false;
			// check if one of the class list elements is equal to some banned class
			for (const value of classList) {
				if (bannedClasses.indexOf(value) !== -1) {
					belongsToBannedClass = true;
				}
			}
			if (belongsToBannedClass) {
				return true;
			} else {
				// move to the above parent
				return this.isEscapeOverCompositeComponent(element.parentNode);
			}
		} else {
			return false;
		}
	}

	/**
	 * Capture when the Escape happens, only for the latest element created
	 * @param event
	 */
	@HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
		if (event.key === 'Escape' || event.code === 'Escape') {
			if (this.isEscapeOverCompositeComponent(document.activeElement) ) {
				// don't close the escape was made over a calendar
				return;
			}
			else {
				this.dialogEscape = true;
				this.dropdownSub = this.dialogService.activatedDropdown.subscribe(res => {
					this.dropdownActivated = res;
				});
				if (this.dropdownActivated === true) {
					if (this.lastElementClicked) {
						if (this.renderer) {
							this.renderer.setAttribute(
								this.lastElementClicked,
								'tabindex',
								'0'
							);
						}
						this.dropdownActivated = false;
						return;
					}
				} else { 
					const dynamicHostModel: DynamicHostModel = this.dynamicDialogList.find(
						(innerDynamicHostModel: DynamicHostModel) => {
							return innerDynamicHostModel.dynamicHostComponent === this.dynamicHostList.last;
						}
					);
					if (dynamicHostModel) {
						const currentDialogComponentInstance = <Dialog>(
							dynamicHostModel.dynamicHostComponent.currentDialogComponentInstance
						);
						currentDialogComponentInstance.onDismiss();
					}
				}	
			}
		}
	}

	/**
	 * Qsdfsdsdf
	 * @param event
	 */

	@HostListener('document:keyup.tab', ['$event']) onKeyupTabHandler(event: any): void {
		// Added attribute check to prevent applying this behavior to all the modals
		if (this.hFlow || this.vFlow) {
			this.tabbedElementChildren = null;
			// Check whether target is present on the form
			const isElementInModal = document.querySelector('.modal-content').contains(event.target);
			let nextElementIndex;
			const controlCount = Array.from(document.querySelectorAll('.modal-content .form-control, .form-control tds-button')).length;
			if (!isElementInModal) {
				event.preventDefault();
				nextElementIndex = (this.lastElementTabbed) ? parseInt(this.lastElementTabbed.getAttribute('tabindex'), 10) + 1 : 1;
				if (nextElementIndex >= controlCount) {
					nextElementIndex = 0;
					this.lastElementTabbed = document.querySelector('.modal-content form [tabindex="0"]');
				}
				const selector = '.modal-content form [tabindex="' + nextElementIndex + '"]';
				const element = document.querySelector(selector);
				const elementId = (element) ? document.querySelector(selector).id : null;
				if (elementId) {
					this.tabbedElementChildren = document.getElementById(elementId).children[0];
					if (this.tabbedElementChildren) {
						this.tabbedElementChildren.focus();
					} else {
						document.getElementById(elementId).focus();
					}
				} else {
					// Get the reference of the first element on the form; cast to any so the focus function call is not reported as an tslint error
					const defaultTabIndex = (this.hFlow) ? '[tabindex="1"]' : '[tabindex="0"]';
					const firstElement = document.querySelector(`.modal-content form ${defaultTabIndex}`) as any;
					if (firstElement) {
						firstElement.focus();
					} else {
						console.log('There is no element with index 0 on the form');
					}
				}
			} else {
				// When dealing with a Kendo UI dropdown control the focus must go to its child so
				// the list opens when interacting with it via keyboard
				if (event.target.tagName === 'KENDO-DROPDOWNLIST') {
					event.target.children[0].focus();
				}
				this.lastElementTabbed = event.target;
			}
		}
	}

	/**
	 * Asdasd
	 * @param event
	 */

	@HostListener('document:keydown.tab', ['$event']) onKeydownTabHandler(event: any): void {
		if (this.hFlow || this.vFlow) {
			if (event.target['tagName'] === 'SPAN') {
				event.target['offsetParent'].focus();
			}
		}
	}

	/**
	 * After a new Dialog open, we hide the background backtrack
	 */
	private showHideBackgrounds(): void {
		this.dynamicHostList.forEach((dynamicHostComponent: DynamicHostComponent, index) => {
			dynamicHostComponent.modalConfigurationModel.showBackground = dynamicHostComponent.modalConfigurationModel.getDefaultShowBackground();

			const firstDynamicHostComponent: DynamicHostComponent = this.dynamicHostList.first;

			if (firstDynamicHostComponent === dynamicHostComponent) {
				dynamicHostComponent.modalConfigurationModel.showBackground = true;
			} else {
				dynamicHostComponent.modalConfigurationModel.showBackground = false;
			}
		});
	}

	ngOnDestroy(): void {
		this.arrClicked = [];
		if (this.dropdownSub) {
			this.dropdownSub.unsubscribe();
		}
	}
}
