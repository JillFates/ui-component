import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dialog} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.interface';

@Component({
	selector: 'app-basic-dialog',
	templateUrl: './basic-dialog.component.html'
})
export class BasicDialogComponent extends Dialog {
	@Input() data: any;
	@Output() successEvent: EventEmitter<any> = new EventEmitter<any>();

	/**
	 * Abstract method that is auto called if the user tries to close the Dialog by pressing Escape or the Cross Icon
	 */
	public onDismiss(): void {
		// If user try to dismiss, validate if the Dialog is ready or not to be closed
		console.log('User Tried to dismiss Dialog');
		super.onCancelClose();
	}

}
