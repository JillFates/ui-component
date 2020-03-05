import { Component, Input } from '@angular/core';
import { Dialog } from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.interface';

@Component({
	selector: 'app-dropdown-escape',
	templateUrl: './dropdown-escape.component.html',
})
export class DropdownEscapeComponent extends Dialog {
	@Input() data: any;
	public listItems: Array<string> = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan'];
	/**
	 * Abstract method that is auto called if the user tries to close the Dialog by pressing Escape or the Cross Icon
	 */
	public onDismiss(): void {
		// If user try to dismiss, validate if the Dialog is ready or not to be closed
		console.log('User Tried to dismiss Dialog');
		super.onCancelClose();
	}
}
