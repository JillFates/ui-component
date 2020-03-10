import {
	DialogButtonModel,
	DialogButtonType,
} from './../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.model';
import { OnInit, Component, Input } from '@angular/core';
import { Dialog } from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.interface';
@Component({
	selector: 'app-dialog-tooltip',
	templateUrl: './dialog-tooltip.component.html',
})
export class DialogTooltipComponent extends Dialog implements OnInit {
	@Input() data: any;

	ngOnInit(): void {
		const editButton: DialogButtonModel = {
			name: 'save',
			icon: 'floppy',
			tooltipText: 'Save',
			disabled: () => true,
			type: DialogButtonType.ACTION,
			action: this.onAccept.bind(this),
		};

		const cancelButton: DialogButtonModel = {
			name: 'cancel',
			icon: 'ban',
			tooltipText: 'Cancel',
			type: DialogButtonType.ACTION,
			action: this.onCancel.bind(this),
		};

		const trashButton: DialogButtonModel = {
			name: 'delete',
			icon: 'trash',
			tooltipText: 'Trash',
			show: () => true,
			type: DialogButtonType.ACTION,
			action: this.onCancel.bind(this),
		};

		this.buttons.push(editButton);
		this.buttons.push(trashButton);
		this.buttons.push(cancelButton);
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
