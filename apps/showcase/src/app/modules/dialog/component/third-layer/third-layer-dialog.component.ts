// Angular
import {Component, ComponentFactoryResolver, EventEmitter, Input, Output} from '@angular/core';
// Model
import {Dialog} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.interface';
import {ModalSize} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.model';
// Component
import {FourthLayerDialogComponent} from '../fourth-layer/fourth-layer-dialog.component';
// Service
import {DialogService} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/service/dialog.service';

@Component({
	selector: 'app-third-layer-dialog',
	templateUrl: './third-layer-dialog.component.html'
})
export class ThirdLayerDialogComponent extends Dialog {
	@Input() data: any;
	@Output() successEvent: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		private dialogService: DialogService,
		private componentFactoryResolver: ComponentFactoryResolver) {
		super();
	}

	/**
	 * Close the Dialog by Cancel/Close/Dismiss
	 * @param result
	 */
	public onCancel(): void {
		const data = {};
		super.onCancelClose(data);
	}

	/**
	 * Abstract method that is auto called if the user tries to close the Dialog by pressing Escape
	 */
	public onDismiss(): void {
		// If user try to dismiss, validate if the Dialog is ready or not to be closed
		console.log('User Tried to dismiss Dialog');
		this.onCancel();
	}

	/**
	 * Open a new basic Window
	 */
	public keepGoing(): void {
		this.dialogService.open({
			componentFactoryResolver: this.componentFactoryResolver,
			component: FourthLayerDialogComponent,
			data: null,
			modalConfiguration: {
				title: 'Last Chance',
				modalSize: ModalSize.SM
			}
		}).subscribe((data: any) => {
			console.log('Fourth Dialog was closed successfully: ', data);
		});
	}

}
