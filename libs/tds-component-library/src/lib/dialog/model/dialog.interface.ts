/**
 * Define the possible data that a Dialog component can expose
 */
import {DialogExit, DialogButtonModel} from './dialog.model';

export abstract class Dialog {
	public data: any;
	public successEvent: any;
	// Contains the left action buttons
	public actionButtons: DialogButtonModel[];
	// Contains buttons at the bottom that are considered for context only
	public contextButtons: DialogButtonModel[];

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

}
