import { EVENT_DIALOG } from './../../model/focus.model';
import { DialogService } from './../../service/dialog.service';
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
	Renderer2
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

@Component({
	selector: 'tds-dialog',
	styleUrls: ['./dialog.component.scss'],
	encapsulation: ViewEncapsulation.None,
	templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChildren(DynamicHostComponent) dynamicHostList!: QueryList<DynamicHostComponent>;

	// Contains a list of every available dialog open as an Stack
	public dynamicDialogList: DynamicHostModel[] = <any>[];
	public dropdownActivated = false;
	private arrClicked: string[] = [];
	private lastElementClicked = null;
	private dialogEscape = false;
	public dropdownSub: Subscription;
	// QueryList does not provides a proper way to get new elements
	private newDialog = false;

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
					const dynamicHostModel = this.dynamicDialogList[this.dynamicDialogList.length - 1];
					// Save to the List which host component is attached
					dynamicHostModel.dynamicHostComponent = this.dynamicHostList.last;
					this.createComponent(dynamicHostModel);
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
						this.renderer.setAttribute(
							this.lastElementClicked,
							'tabindex',
							'0'
						);
						this.lastElementClicked.focus();
						this.dropdownActivated = false;
						this.dialogService.activatedDropdown.next(false);
						return;
					} else {
						if (this.dropdownActivated === false) {
							dynamicHostModel.dialogModel.observable.next(result);
							dynamicHostModel.dialogModel.observable.complete();
							console.log('completed');
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

			setTimeout(() => {
				dynamicHostModel.dynamicHostComponent.publishDialog();
				dynamicHostModel.instantiated = true;									
				this.setupFocus(currentViewContainerRef);
			}, 1000);

		} catch (e) {
			console.error("Dialog can't be instantiated/created", e);
		}
	}

	/**
	 * This method will help to setup the focus to the first input, placing the cursor indicator
	 * **/
	private setupFocus(currentViewContainerRef: any): void {
		setTimeout(() => {			
			let isFocused = false;
			if (document.getElementsByTagName('tds-dialog').length > 0) {
				if ((document.getElementsByTagName('tds-dialog')[0].getElementsByClassName('modal-body').length > 0)) {
					if (document.getElementsByTagName('tds-dialog')[0]
						.getElementsByClassName('modal-body')[0]
						.getElementsByClassName('tab-content').length > 0) {
						if (document.getElementsByTagName('tds-dialog')[0]
							.getElementsByClassName('modal-body')[0]
							.getElementsByClassName('tab-content')[0]
							.getElementsByClassName('is-displayed').length > 0) {
							if (document.getElementsByTagName('tds-dialog')[0]
								.getElementsByClassName('modal-body')[0]
								.getElementsByClassName('tab-content')[0]
								.getElementsByClassName('is-displayed')[0]
								.getElementsByClassName('clr-input').length > 0) {
								const found = currentViewContainerRef.element.nativeElement.nextSibling.firstElementChild.children[1].children;
								for (let i = 0; i < found.length; ++i) {									
									if (found[i].getAttribute('ng-reflect-ng-class') === 'is-displayed active') {
										this.renderer.setAttribute(
											found[i].getElementsByClassName('clr-input')[0],
											'tabindex',
											'0'
										);
										found[i].getElementsByClassName('clr-input')[0].focus();										
										isFocused = true;									
									}
								}
								
							}
						}
					}
				}
			} 
			if (currentViewContainerRef.element.nativeElement.nextSibling && !isFocused) {
					if (currentViewContainerRef.element.nativeElement.nextSibling.getElementsByTagName('input')) {
						if (currentViewContainerRef.element.nativeElement.nextSibling.getElementsByTagName('input').length > 0) {
							if (currentViewContainerRef.element.nativeElement.nextSibling.getElementsByTagName('input')[0]) {
								if (currentViewContainerRef.element.nativeElement.nextSibling
									.getElementsByTagName('input')[0].getAttribute('type') !== 'checkbox') {
									this.renderer.setAttribute(
										currentViewContainerRef.element.nativeElement.nextSibling.getElementsByTagName('input')[0],
										'tabindex',
										'0'
									);
									currentViewContainerRef.element.nativeElement.nextSibling.getElementsByTagName('input')[0].focus();
									if (currentViewContainerRef.element.nativeElement.nextSibling.getElementById('simpleApiActionName')) {
										currentViewContainerRef.element.nativeElement.nextSibling.getElementById('simpleApiActionName').focus();	
									}									
									this.dropdownActivated = false;
									isFocused = true;									
								}
							}
						}
					}
			}

			if (!isFocused) {
				this.renderer.setAttribute(
					currentViewContainerRef.element.nativeElement.nextSibling.getElementsByTagName('textarea')[0],
					'tabindex',
					'0'
				);
				currentViewContainerRef.element.nativeElement.nextSibling.getElementsByTagName('textarea')[0].focus();
				this.dropdownActivated = false;
				isFocused = true;				
			}

		}, 1000);
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
		if (this.arrClicked.length > 0) {
			this.arrClicked.pop();
			this.dialogService.activatedDropdown.next(false);
		}
	}

	/**
	 * Capture click event
	 */
	@HostListener('document:click', ['$event'])
	public onClicker(event: any): void {
		let isDone = false;
		let dropdownInterval = null;
		let ki_calendarDropdownInterval = null;
		let searchBarInterval = null;
		this.dropdownActivated = false;

		this.popFromArray();

		const pushIsDone = (currentElement) => {
			this.pushToArray(event.target.tagName);
			this.dropdownActivated = true;
			isDone = true;
			this.lastElementClicked = currentElement;
		};

		const startDropdownInterval = () => {
			const trackDropdown = () => {				
				this.dialogService.activatedDropdown.next(true);
				if (event.target.parentNode.getAttribute('aria-expanded') === 'false') {
					clearInterval(dropdownInterval);					
					setTimeout(() => {
						this.popFromArray();
					}, 1000);
				}
			};
			dropdownInterval = setInterval(trackDropdown.bind(this), 400);
		};

		const startKICalendarDropdownInterval = () => {
			const trackDropdown = () => {
				this.dialogService.activatedDropdown.next(true);
				if (document.getElementsByTagName('kendo-popup').length === 0) { 
					clearInterval(ki_calendarDropdownInterval);
					setTimeout(() => {
						this.popFromArray();
					}, 1000);
				}
			};
			ki_calendarDropdownInterval = setInterval(trackDropdown.bind(this), 400);
		};

		const startSearchBarInterval = () => {
			const trackDropdown = () => {
				this.dialogService.activatedDropdown.next(true);
				if (event.target.parentNode.parentNode.firstChild.getAttribute('ng-reflect-popup-open') === 'false') {
					clearInterval(searchBarInterval);
					setTimeout(() => {
						this.popFromArray();
					}, 1000);
				}
			};
			searchBarInterval = setInterval(trackDropdown.bind(this), 400);
		};

		if (event.target) {

			if (event.target.parentNode) {
				if (event.target.parentNode.previousElementSibling) {
					if (event.target.parentNode.previousElementSibling.tagName) {
						if (event.target.parentNode.previousElementSibling.tagName === 'KENDO-DATEINPUT') {
							if (document.getElementsByTagName('kendo-popup')) {
								if (document.getElementsByTagName('kendo-popup').length > 0) {
									startKICalendarDropdownInterval();
									pushIsDone(event.target);
								}
							}	
						}		
					}
				}
			} 
			
			if (event.target.tagName) {				
				// reason for this is because somehow I realized that in Windows escaping the select has to be deliberate, in Mac, it's not. - K
				if (navigator.platform !== 'MacIntel') {
					if (event.target.tagName === 'SELECT') {
						pushIsDone(event.target);
					}
				} else if (event.target.tagName === 'CLR-ICON') {
					pushIsDone(event.target);
				} else if (event.target.parentNode) {
					if (event.target.parentNode.parentNode) {
						if (event.target.parentNode.parentNode.tagName === 'KENDO-DROPDOWNLIST') {							
							if (event.target.parentNode.getAttribute('aria-expanded') === 'true') { 
								startDropdownInterval();
							}							
							pushIsDone(event.target.parentNode.parentNode);
						} else if (event.target.parentNode.parentNode.parentNode) {
							if (event.target.parentNode.parentNode.parentNode.tagName === 'KENDO-DROPDOWNLIST') {
								pushIsDone(event.target.parentNode.parentNode.parentNode);
							}
						}

						if (event.target.parentNode.parentNode.firstChild) {
							if (event.target.parentNode.parentNode.firstChild.tagName) {
								if (event.target.parentNode.parentNode.firstChild.tagName === 'KENDO-SEARCHBAR') {									
									if (event.target.parentNode.parentNode.firstChild.getAttribute('ng-reflect-popup-open')) {
										if (event.target.parentNode.parentNode.firstChild.getAttribute('ng-reflect-popup-open') === 'true') {
											startSearchBarInterval();
											pushIsDone(event.target.parentNode.parentNode.firstChild);
										}
									}
								}
							}
						}
					}
				}
			}

		}
	}

	/**
	 * Capture when the Escape happens, only for the latest element created
	 * @param event
	 */
	@HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
		if (event.key === 'Escape' || event.code === 'Escape') {
			this.dialogEscape = true;
			this.dropdownSub = this.dialogService.activatedDropdown.subscribe(res => { 
				this.dropdownActivated = res;
			});
			if (this.dropdownActivated === true) {
				this.renderer.setAttribute(
					this.lastElementClicked,
					'tabindex',
					'0'
				);
				this.lastElementClicked.focus();
				this.dropdownActivated = false;
				return;
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
