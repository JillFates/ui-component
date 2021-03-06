// Angular
import {Component, Input, OnInit} from '@angular/core';
// Model
import {Dialog} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.interface';
import {
	DialogButtonModel,
	DialogButtonType
} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.model';

@Component({
	selector: 'app-button-action-context-dialog',
	templateUrl: './button-action-context-dialog.component.html'
})
export class ButtonActionContextDialogComponent extends Dialog implements OnInit {
	@Input() data: any;
	@Input() buttons: any;

	ngOnInit(): void {
		const editButton: DialogButtonModel = {
			name: 'save',
			icon: 'floppy',
			type: DialogButtonType.ACTION,
			action: this.onAccept.bind(this)
		};

		const cancelButton: DialogButtonModel = {
			name: 'cancel',
			icon: 'ban',
			type: DialogButtonType.ACTION,
			action: this.onCancel.bind(this)
		};

		const trashButton: DialogButtonModel = {
			name: 'delete',
			icon: 'trash',
			type: DialogButtonType.ACTION,
			action: this.onCancel.bind(this)
		};

		const calendarButton: DialogButtonModel = {
			name: 'calendar',
			icon: 'calendar',
			text: 'Appointments',
			type: DialogButtonType.CONTEXT,
			action: this.onCancel.bind(this)
		};

		this.buttons.push(editButton);
		this.buttons.push(trashButton);
		this.buttons.push(cancelButton);
		this.buttons.push(calendarButton);
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
	 * Abstract method that is auto called if the user tries to close the Dialog by pressing Escape or the Cross Icon
	 */
	public onDismiss(): void {
		// If user try to dismiss, validate if the Dialog is ready or not to be closed
		console.log('User Tried to dismiss Dialog');
		this.onCancel();
	}
}
