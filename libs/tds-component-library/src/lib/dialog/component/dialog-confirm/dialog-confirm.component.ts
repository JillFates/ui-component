// Angular
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// Model
import {Dialog} from '../../model/dialog.interface';
import {
	DialogButtonModel,
	DialogButtonType, DialogConfirmAction
} from '../../model/dialog.model';

@Component({
	selector: 'tds-dialog-confirm',
	templateUrl: './dialog-confirm.component.html'
})
export class DialogConfirmComponent extends Dialog implements OnInit {
	@Input() content: any;
	@Input() buttons: any;
	@Output() successEvent: EventEmitter<any> = new EventEmitter<any>();

	ngOnInit(): void {
		const confirmButton: DialogButtonModel = {
			name: 'confirm',
			icon: 'check',
			text: 'Confirm',
			type: DialogButtonType.CONTEXT,
			action: this.onConfirm.bind(this)
		};

		const cancelButton: DialogButtonModel = {
			name: 'cancel',
			icon: 'ban',
			text: 'Cancel',
			type: DialogButtonType.CONTEXT,
			action: this.onCancel.bind(this)
		};

		this.buttons.push(confirmButton);
		this.buttons.push(cancelButton);
	}

	/**
	 * Close the Dialog by Confirm the Action
	 * @param result
	 */
	public onConfirm(): void {
		const data = {
			confirm: DialogConfirmAction.CONFIRM
		};
		super.onCancelClose(data);
	}

	/**
	 * Close the Dialog by Cancel/Close/Dismiss
	 * @param result
	 */
	public onCancel(): void {
		const data = {
			confirm: DialogConfirmAction.CANCEL
		};
		super.onCancelClose(data);
	}

	/**
	 * Abstract method that is auto called if the user tries to close the Dialog by pressing Escape or the Cross Icon
	 */
	public onDismiss(): void {
		this.onCancel();
	}
}
