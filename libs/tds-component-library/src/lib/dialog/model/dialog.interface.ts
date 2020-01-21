/**
 * Define the possible data that a Dialog component can expose
 */

export abstract class Dialog {
	public data: any;
	public successEvent: any;

	/**
	 * Generic accept method
	 */
	public abstract onAccept(): void;

	/**
	 * Generic cancel method
	 */
	public abstract onCancel(): void;

	/**
	 * Generic dismiss method
	 */
	public abstract onDismiss(): void;

	/**
	 * Close the Dialog successfully
	 */
	public onAcceptSuccess(result: any): void {
		this.successEvent.emit(result);
	}

	/**
	 * Dismiss the Dialog
	 */
	public onCancelClose(result: any): void {
		result.dismiss = true;
		this.successEvent.emit(result);
	}

}
