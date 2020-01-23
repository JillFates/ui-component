// Angular
import {Component, EventEmitter, Input, Output} from '@angular/core';
// Model
import {Dialog} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.interface';

@Component({
	selector: 'app-no-background-dialog',
	templateUrl: './no-background-dialog.component.html',
	styleUrls: ['./no-background-dialog.component.scss'],
})
export class NoBackgroundDialogComponent extends Dialog {
	@Input() data: any;
	@Output() successEvent: EventEmitter<any> = new EventEmitter<any>();

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
}
