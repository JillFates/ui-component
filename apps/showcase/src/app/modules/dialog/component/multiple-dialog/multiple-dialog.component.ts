// Angular
import {Component, ComponentFactoryResolver, EventEmitter, Input, Output} from '@angular/core';
// Model
import {Dialog} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.interface';
import {ModalSize} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.model';
// Component
import {BasicDialogComponent} from '../basic-dialog/basic-dialog.component';
// Service
import {DialogService} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/service/dialog.service';
import {ThirdLayerDialogComponent} from '../third-layer/third-layer-dialog.component';

@Component({
	selector: 'app-multiple-dialog',
	templateUrl: './multiple-dialog.component.html'
})
export class MultipleDialogComponent extends Dialog {
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
	public bluePill(): void {
		this.dialogService.open({
			componentFactoryResolver: this.componentFactoryResolver,
			component: BasicDialogComponent,
			data: null,
			modalConfiguration: {
				title: 'Blue Pill choice',
				modalSize: ModalSize.SM
			}
		}).subscribe((data: any) => {
			console.log('Basic Dialog was closed successfully: ', data);
		});
	}

	/**
	 * Open the Multiple Dialog Inception
	 */
	public redPill(): void {
		this.dialogService.open({
			componentFactoryResolver: this.componentFactoryResolver,
			component: ThirdLayerDialogComponent,
			data: null,
			modalConfiguration: {
				title: 'Red Pill choice',
				modalSize: ModalSize.MD
			}
		}).subscribe((data: any) => {
			console.log('Basic Dialog was closed successfully: ', data);
		});
	}
}
