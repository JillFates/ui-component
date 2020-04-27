/**
 * Define the possible data that a Dialog component can expose
 */
import { DialogExit, DialogButtonModel } from './dialog.model';
import { EventEmitter, ElementRef } from '@angular/core';
import { EVENT_DIALOG } from './focus.model';

export abstract class Dialog {
	// Dialog specific data
	public data: any;
	// Content is a very specific property that can be used to create custom Confirms
	public content: any;
	public successEvent = new EventEmitter<any>();
	public extraActionEvent = new EventEmitter<any>();
	// Contains action/context buttons
	public buttons: DialogButtonModel[] = new Array();
	// Title
	private title = '';
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
	 * To Emit the event when something needs to be exposed to the Dialog
	 */
	public onSetUpFocus(element: ElementRef): void {
		this.extraActionEvent.emit({event: EVENT_DIALOG.FOCUS, element: element});
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

	/**
	 * Change
	 * @param title
	 */
	public setTitle(title: string): void {
		this.title = title;
	}

	/**
	 * Get Current title
	 * @param title
	 */
	public getTitle(): string {
		return this.title;
	}

	/**
	 * Generic double click method
	 */
	public onDoubleClick(event: MouseEvent): void {
		// silence is gold
	}
}
