/**
 * Define the possible data that a Dialog component can expose
 */
import {DialogExit, DialogButtonModel} from './dialog.model';

export abstract class Dialog {
	public data: any;
	public successEvent: any;
	// Contains action/context buttons
	public buttons: DialogButtonModel[];

	/**
	 * Generic dismiss method
	 */
	public abstract onDismiss(): void;

	/**
	 * Close the Dialog successfully
	 */
	public onAcceptSuccess(result: any = {}): void {
		result.status = DialogExit.ACCEPT;
		this.successEvent.emit(result);
	}

	/**
	 * Dismiss the Dialog
	 */
	public onCancelClose(result: any = {}): void {
		result.status = DialogExit.CLOSE;
		this.successEvent.emit(result);
	}

	/**
	 * Override a button from the list
	 * @param name
	 * @param dialogButtonModel
	 */
	protected changeButton(name: string, dialogButtonModel: DialogButtonModel): void {
		const button = this.buttons.find((buttonModel: DialogButtonModel) => {
			return buttonModel.name === name;
		});
		if (button) {
			Object.assign(button, dialogButtonModel);
		}
	}

}