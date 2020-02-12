import {Component, Input, OnInit} from '@angular/core';
import {Dialog} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.interface';
import {
	DialogButtonModel,
	DialogButtonType
} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.model';

@Component({
	selector: 'app-reactive-buttons-dialog',
	templateUrl: './reactive-buttons-dialog.component.html'
})
export class ReactiveButtonsDialogComponent extends Dialog implements OnInit {
	@Input() data: any;

	private isSaveDisabled = true;
	private isShowDelete = false;

	ngOnInit(): void {
		const editButton: DialogButtonModel = {
			name: 'save',
			icon: 'floppy',
			disabled: () => this.isSaveDisabled,
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
			show: () => this.isShowDelete,
			type: DialogButtonType.ACTION,
			action: this.onCancel.bind(this)
		};

		this.buttons.push(editButton);
		this.buttons.push(trashButton);
		this.buttons.push(cancelButton);
	}

	/**
	 * Enable the Disabled Button
	 */
	public enableSave(): void {
		this.isSaveDisabled = false;
	}

	/**
	 * Show the hidden delete button
	 */
	public showDelete(): void {
		this.isShowDelete = true;
	}

	/**
	 * Show the hidden delete button
	 */
	public changeTitle(): void {
		this.setTitle('Title has changed!');
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
