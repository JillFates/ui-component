import { Dialog } from '../../model/dialog.interface';
import { Component } from '@angular/core';
import { DialogConfirmAction } from '../../model/dialog.model';

@Component({
	selector: 'tds-dialog-dropdown',
	templateUrl: './dialog-dropdown.component.html',
})
export class DialogDropdownComponent extends Dialog {
	public listItems: Array<string> = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan'];
	public data: Array<string>;

	/**
	 * Close the Dialog by Cancel/Close/Dismiss
	 * @param result
	 */
	public onCancel(): void {
		const data = {
			confirm: DialogConfirmAction.CANCEL,
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
