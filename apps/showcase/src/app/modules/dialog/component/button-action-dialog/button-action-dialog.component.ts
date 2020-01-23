import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dialog} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.interface';

@Component({
	selector: 'app-button-action-dialog',
	templateUrl: './button-action-dialog.component.html'
})
export class ButtonActionDialogComponent extends Dialog implements OnInit {
	@Input() data: any;
	@Input() contextButtons: any;
	@Input() actionButtons: any;
	@Output() successEvent: EventEmitter<any> = new EventEmitter<any>();

	ngOnInit(): void {
		this.actionButtons.push({ name: ''});
	}

	/**
	 * Close the Dialog properly
	 * @param result
	 */
	public onAccept(): void {
		const data = {};
		super.onAcceptSuccess(data);
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

}
