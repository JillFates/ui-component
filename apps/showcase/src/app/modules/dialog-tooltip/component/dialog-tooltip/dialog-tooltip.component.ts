import {
	DialogButtonModel,
	DialogButtonType,
} from './../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.model';
import { OnInit, Component, Input } from '@angular/core';
import { Dialog } from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
	selector: 'app-dialog-tooltip',
	templateUrl: './dialog-tooltip.component.html',
})
export class DialogTooltipComponent extends Dialog implements OnInit {
	@Input() data: any;
	exampleForm: FormGroup;
	model: string;
	firstName: string;
	midleName: string;
	lastName: string;

	/**
	 * This will reset the form
	 */
	resetForm(): void {
		this.exampleForm.reset();
	}

	/**
	 * For submitting stub
	 */
	submit(): void {
		// ...
	}

	ngOnInit(): void {
		this.exampleForm = new FormGroup({
			sample: new FormControl('', Validators.required),
		});

		const editButton: DialogButtonModel = {
			name: 'save',
			icon: 'floppy',
			tooltipText: 'Save',
			disabled: () => this.exampleForm.pristine,
			type: DialogButtonType.ACTION,
			action: this.onAccept.bind(this),
		};

		const trashButton: DialogButtonModel = {
			name: 'delete',
			icon: 'trash',
			tooltipText: 'Trash',
			show: () => !this.exampleForm.pristine,
			type: DialogButtonType.ACTION,
			action: this.onCancel.bind(this),
		};

		const cancelButton: DialogButtonModel = {
			name: 'cancel',
			icon: 'ban',
			tooltipText: 'Cancel',
			type: DialogButtonType.ACTION,
			show: () => !this.exampleForm.pristine,
			action: this.onCancel.bind(this),
		};

		const closeButton: DialogButtonModel = {
			name: 'cancel',
			icon: 'close',
			tooltipText: 'Close',
			show: () => this.exampleForm.pristine,
			type: DialogButtonType.ACTION,
			action: this.onCancel.bind(this),
		};

		this.buttons.push(editButton);
		this.buttons.push(trashButton);
		this.buttons.push(cancelButton);
		this.buttons.push(closeButton);
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
