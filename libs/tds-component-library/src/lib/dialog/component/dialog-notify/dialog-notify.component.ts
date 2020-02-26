// Angular
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// Model
import {Dialog} from '../../model/dialog.interface';
import {
	DialogButtonModel,
	DialogButtonType, DialogConfirmAction
} from '../../model/dialog.model';

@Component({
	selector: 'tds-dialog-notify',
	templateUrl: './dialog-notify.component.html'
})
export class DialogNotifyComponent extends Dialog implements OnInit {
	@Input() content: any;
	@Input() buttons: any;
	@Output() successEvent: EventEmitter<any> = new EventEmitter<any>();

	ngOnInit(): void {
		const okButton: DialogButtonModel = {
			name: 'confirm',
			icon: 'check',
			text: 'Ok',
			type: DialogButtonType.CONTEXT,
			action: this.onConfirm.bind(this)
		};

		this.buttons.push(okButton);
	}

	/**
	 * Close the Dialog by Ok the Action
	 * @param result
	 */
	public onConfirm(): void {
		const data = {
			confirm: DialogConfirmAction.CONFIRM
		};
		super.onCancelClose(data);
	}

	/**
	 * Abstract method that is auto called if the user tries to close the Dialog by pressing Escape or the Cross Icon
	 */
	public onDismiss(): void {
		super.onCancelClose();
	}
}
