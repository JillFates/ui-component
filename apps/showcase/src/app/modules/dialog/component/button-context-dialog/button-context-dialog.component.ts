// Angular
import {Component, Input, OnInit} from '@angular/core';
// Model
import {Dialog} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.interface';
import {
	DialogButtonModel,
	DialogButtonType
} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.model';

@Component({
	selector: 'app-button-context-dialog',
	templateUrl: './button-context-dialog.component.html'
})
export class ButtonContextDialogComponent extends Dialog implements OnInit {
	@Input() data: any;

	ngOnInit(): void {
		const calendarButton: DialogButtonModel = {
			name: 'calendar',
			icon: 'calendar',
			text: 'Appointments',
			type: DialogButtonType.CONTEXT,
			// show? Do You have the Permission?
			action: this.onCancel.bind(this)
		};

		this.buttons.push(calendarButton);
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
