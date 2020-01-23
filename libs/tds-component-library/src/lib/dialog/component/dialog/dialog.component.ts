// Angular
import {
	Component,
	HostListener,
	QueryList,
	ViewChildren
} from '@angular/core';
// Service
import {EventService} from '../../../service/event-service/event.service';
// Component
import {DynamicHostComponent} from '../dynamic-host/dynamic-host.component';
// Model
import {DialogEventType} from '../../model/dialog.model';
import {Dialog} from '../../model/dialog.interface';
import {DynamicHostModel} from '../../model/dynamic-host.model';

@Component({
	selector: 'tds-dialog',
	templateUrl: './dialog.component.html',
})
export class DialogComponent {
	@ViewChildren(DynamicHostComponent) dynamicHostList !: QueryList<DynamicHostComponent>;
	// Contains a list of every available dialog open as an Stack
	public dynamicDialogList = <any>[];

	constructor(private eventService: EventService) {
		this.registerDialog();
	}

	/**
	 * Register the event, so it can be listen to on open events or clear current instance
	 */
	public registerDialog(): void {
		this.eventService.on(DialogEventType.OPEN, (dialogModel: any) => {
			// We initialize the Model with the incoming Model event
			const dynamicHostModel: DynamicHostModel = {
				dialogModel: dialogModel.event
			};

			// We add a new Empty element to the dynamicDialogList
			this.dynamicDialogList.push(dynamicHostModel);

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

		// Create new instance
		const componentFactory = dynamicHostModel.dialogModel.componentFactoryResolver.resolveComponentFactory(
			dynamicHostModel.dialogModel.component
		);

		const currentViewContainerRef = dynamicHostModel.dynamicHostComponent.dynamicContent.viewContainerRef;
		currentViewContainerRef.clear();

		const componentRef = currentViewContainerRef.createComponent(
			componentFactory
		);
		const currentDialogComponentInstance = <Dialog>componentRef.instance;
		currentDialogComponentInstance.data = dynamicHostModel.dialogModel.data;

		currentDialogComponentInstance.buttons = [];

		// Overwrite the property configuration
		if (dynamicHostModel.dialogModel.modalConfiguration) {
			dynamicHostModel.dynamicHostComponent.modalConfigurationModel =
				Object.assign(dynamicHostModel.dynamicHostComponent.modalConfigurationModel, dynamicHostModel.dialogModel.modalConfiguration);
			// If the user wants to set the background as empty, we change the default so we can revert it to that
			if (!dynamicHostModel.dynamicHostComponent.modalConfigurationModel.showBackground) {
				dynamicHostModel.dynamicHostComponent.modalConfigurationModel.setDefaultShowBackground(
					dynamicHostModel.dynamicHostComponent.modalConfigurationModel.showBackground
				);
			}
		}

		// Save the instance
		dynamicHostModel.dynamicHostComponent.currentDialogComponentInstance = currentDialogComponentInstance;

		// Open the dialog
		setTimeout(() => {
			// Before to open the Dialog, we hide any other background
			this.showHideBackgrounds();
			dynamicHostModel.dynamicHostComponent.isDialogOpen = true;
		});

		// Emits on Success
		if (currentDialogComponentInstance.successEvent) {
			currentDialogComponentInstance.successEvent.subscribe((result) => {
				dynamicHostModel.dialogModel.observable.next(result);
				dynamicHostModel.dialogModel.observable.complete();
				// Last element of the array only
				dynamicHostModel.dynamicHostComponent.isDialogOpen = false;
				this.dynamicDialogList.pop();
				setTimeout(() => {
					// After close a Dialog, we show any other background
					this.showHideBackgrounds();
				});
			});
		}
	}

	/**
	 * Capture when the Escape happens, only for the latest element created
	 * @param event
	 */
	@HostListener('document:keyup.escape', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
		if (event.key === 'Escape' || event.code === 'Escape') {
			const dynamicHostModel: DynamicHostModel = this.dynamicDialogList.find((innerDynamicHostModel: DynamicHostModel) => {
				return innerDynamicHostModel.dynamicHostComponent === this.dynamicHostList.last;
			});
			if (dynamicHostModel) {
				const currentDialogComponentInstance = <Dialog>dynamicHostModel.dynamicHostComponent.currentDialogComponentInstance;
				currentDialogComponentInstance.onDismiss();
			}
		}
	}

	/**
	 * After a new Dialog open, we hide the background backtrack
	 */
	private showHideBackgrounds(): void {
		this.dynamicHostList.forEach((dynamicHostComponent: DynamicHostComponent, index) => {
			dynamicHostComponent.modalConfigurationModel.showBackground = dynamicHostComponent.modalConfigurationModel.getDefaultShowBackground();
			if (index < (this.dynamicHostList.length - 1)) {
				dynamicHostComponent.modalConfigurationModel.showBackground = false;
			}
		});
	}
}
