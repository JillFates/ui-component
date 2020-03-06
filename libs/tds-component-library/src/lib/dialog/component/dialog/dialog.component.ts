import { DialogService } from './../../service/dialog.service';
// Angular
import { Component, HostListener, QueryList, ViewChildren, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
// Service
import { EventService } from '../../../service/event-service/event.service';
// Component
import { DynamicHostComponent } from '../dynamic-host/dynamic-host.component';
// Model
import { DialogEventType } from '../../model/dialog.model';
import { Dialog } from '../../model/dialog.interface';
import { DynamicHostModel } from '../../model/dynamic-host.model';
import { Subscription } from 'rxjs';
import forEach from 'ramda/es/forEach';

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
	dropdownSub: Subscription;

	constructor(private eventService: EventService, private dialogService: DialogService) {
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
				currentDialogComponentInstance.successEvent.subscribe(result => {
					dynamicHostModel.dialogModel.observable.next(result);
					dynamicHostModel.dialogModel.observable.complete();
					// Last element of the array only
					this.dynamicDialogList.pop();
					setTimeout(() => {
						// After close a Dialog, we show any other background
						this.showHideBackgrounds();
					});
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
		this.arrClicked.pop();
		this.dialogService.activatedDropdown.next(false);
	}

	/**
	 * Capture click event
	 */
	@HostListener('document:click', ['$event'])
	public onClicker(event: any): void {
		const targetNodes1 = [
			event.target,
			event.target.tagName,
			event.target.parentNode,
			event.target.parentNode.parentNode,
			event.target.parentNode.parentNode.parentNode,
			event.target.parentNode.parentNode.parentNode.tagName,
		];

		if (this.nullCheck(targetNodes1)) {
			if (
				event.target.tagName === 'SELECT' ||
				event.target.tagName === 'CLR-ICON' ||
				event.target.parentNode.parentNode.parentNode.tagName === 'KENDO-DROPDOWNLIST' ||
				event.target.parentNode.parentNode.tagName === 'KENDO-DROPDOWNLIST' ||
				event.target.parentNode.parentNode.tagName === 'KENDO-DATEPICKER' ||
				event.target.parentNode.parentNode.tagName === 'KENDO-TIMEPICKER'
			) {
				this.pushToArray(event.target.tagName);
			} else {
				this.popFromArray();
			}
		}
	}

	/**
	 * Capture when the Escape happens, only for the latest element created
	 * @param event
	 */
	@HostListener('document:keyup.escape', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
		if (event.key === 'Escape' || event.code === 'Escape') {
			const dynamicHostModel: DynamicHostModel = this.dynamicDialogList.find(
				(innerDynamicHostModel: DynamicHostModel) => {
					return innerDynamicHostModel.dynamicHostComponent === this.dynamicHostList.last;
				}
			);
			if (this.arrClicked.length !== 0) {
				this.arrClicked.pop();
			} else {
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
