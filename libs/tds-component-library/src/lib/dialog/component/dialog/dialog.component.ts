import { DialogService } from './../../service/dialog.service';
// Angular
import { Component, HostListener, QueryList, ViewChildren, ViewEncapsulation, OnInit, OnDestroy, Renderer2 } from '@angular/core';
// Service
import { EventService } from '../../../service/event-service/event.service';
// Component
import { DynamicHostComponent } from '../dynamic-host/dynamic-host.component';
// Model
import { DialogEventType } from '../../model/dialog.model';
import { Dialog } from '../../model/dialog.interface';
import { DynamicHostModel } from '../../model/dynamic-host.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'tds-dialog',
	styleUrls: ['./dialog.component.scss'],
	encapsulation: ViewEncapsulation.None,
	templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit, OnDestroy {
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
	 * Register the event, so it can be listen to on open events or clear current instance
	 */
	public registerDialog(): void {
		this.eventService.on(DialogEventType.OPEN, (dialogModel: any) => {
			// We initialize the Model with the incoming Model event
			const dynamicHostModel: DynamicHostModel = {
				dialogModel: dialogModel.event,
				instantiated: false,
			};

			// We add a new Empty element to the dynamicDialogList
			this.dynamicDialogList.push(dynamicHostModel);
			// Wait a millisecond to be registered
			setTimeout(() => {
				// We get the lasted change added
				// Save to the List which host component is attached
				dynamicHostModel.dynamicHostComponent = this.dynamicHostList.last;
				this.createComponent(dynamicHostModel);
			});
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
				this.dialogService.activatedDropdown.subscribe(res => {
					console.log('res:' + res);
					this.dropdownActivated = res;
				});
				currentDialogComponentInstance.successEvent.subscribe(result => {

					if (this.dropdownActivated) {
						this.renderer.setAttribute(
							this.lastElementClicked,
							'tabindex',
							'0'
						);
						this.lastElementClicked.focus();
						this.dropdownActivated = false;
						return;
					} else {
						if (this.dropdownActivated && this.dialogEscape) {
							dynamicHostModel.dialogModel.observable.next(result);
							dynamicHostModel.dialogModel.observable.complete();
							alert('completed');
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
				dynamicHostModel.instantiated = true;
			});
		} catch (e) {
			console.error("Dialog can't be instantiated/created", e);
		}
	}

	/**
	 * Function that does a null check and undefined check
	 */
	private nullCheck(objectNode: any[]): boolean {
		let truthy = true;
		for (let i = 0; i < objectNode.length; ++i) {
			if (!(objectNode[i] !== null || objectNode[i] !== undefined)) {
				truthy = false;
				break;
			}
		}
		return truthy;
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
		console.log('click');
		let isDone = false;
		this.dropdownActivated = false;
		this.popFromArray();
		const pushIsDone = (currentElement) => {
			this.pushToArray(event.target.tagName);
			this.dropdownActivated = true;
			isDone = true;
			this.lastElementClicked = currentElement;
		};

		if (event.target) {
			if (event.target.tagName) {
				// alert(event.target.parentNode.parentNode.parentNode.tagName);
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
							// console.log(event.target.parentNode.getAttribute('aria-expanded'));
							console.log('here 1');
							console.log(event.target.parentNode.getAttribute('aria-expanded') === 'true');

							pushIsDone(event.target.parentNode.parentNode);
						} else if (event.target.parentNode.parentNode.parentNode) {
							if (event.target.parentNode.parentNode.parentNode.tagName === 'KENDO-DROPDOWNLIST') {
								console.log('kendo 2');
								pushIsDone(event.target.parentNode.parentNode.parentNode);
							}
						}
					}
				}
			}

			// if (isDone === false) {
			// 	if (event.target.parentNode) {
			// 		if (event.target.parentNode.parentNode) {
			// 			if (event.target.parentNode.parentNode.tagName) {
			// 				if (event.target.parentNode.parentNode.tagName === 'KENDO-DROPDOWNLIST') {
			// 					this.pushToArray(event.target.tagName);
			// 					this.dropdownActivated = true;
			// 				} else {
			// 					this.popFromArray();
			// 				}
			// 			}
			// 		}
			// 	}
			// }
		}
	}

	/**
	 * Capture when the Escape happens, only for the latest element created
	 * @param event
	 */
	@HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
		if (event.key === 'Escape' || event.code === 'Escape') {
			this.dialogEscape = true;
			alert('this.dropdownActivated:' + this.dropdownActivated);
			if (this.dropdownActivated) {
				this.renderer.setAttribute(
					this.lastElementClicked,
					'tabindex',
					'0'
				);
				this.lastElementClicked.focus();
				this.dropdownActivated = false;
				return;
			} else { // dropdown not active
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

			alert('still here');

			// if (this.lastElementClicked) {
			// 	console.log('this.lastElementClicked:', this.lastElementClicked);
			// 	if (this.lastElementClicked.firstElementChild.getAttribute('aria-expanded') === 'true') {
			// 		// this.dropdownActivated = false;
			// 		alert('DONT close dialog ');
			// 		return;
			// 	} else {
			// 		alert('CLOSE dialog');
			// 	}
			// }

			// if (this.dropdownActivated) {
			// 	if (this.lastElementClicked) {
			// 		// console.log('this.lastElementClicked:', this.lastElementClicked);
			// 		if (this.lastElementClicked.firstElementChild.hasAttribute('aria-activedescendant')) {
			// 			// this.dropdownActivated = false;
			// 			return;
			// 		}
			// 	}
			// }

			// const dynamicHostModel: DynamicHostModel = this.dynamicDialogList.find(
			// 	(innerDynamicHostModel: DynamicHostModel) => {
			// 		return innerDynamicHostModel.dynamicHostComponent === this.dynamicHostList.last;
			// 	}
			// );
			// if (this.dropdownActivated === false) {
			// 	if (dynamicHostModel) {
			// 		const currentDialogComponentInstance = <Dialog>(
			// 			dynamicHostModel.dynamicHostComponent.currentDialogComponentInstance
			// 		);
			// 		currentDialogComponentInstance.onDismiss();
			// 	}
			// } else {
			// 	this.arrClicked.pop();
			// 	this.dropdownActivated = false;
			// }
		}
	}

	/**
	 * After a new Dialog open, we hide the background backtrack
	 */
	private showHideBackgrounds(): void {
		this.dynamicHostList.forEach((dynamicHostComponent: DynamicHostComponent, index) => {
			dynamicHostComponent.modalConfigurationModel.showBackground = dynamicHostComponent.modalConfigurationModel.getDefaultShowBackground();
			if (index < this.dynamicHostList.length - 1) {
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
