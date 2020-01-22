import {ComponentFactoryResolver} from '@angular/core';
import {Observer} from 'rxjs';

export class ModalConfigurationModel {
	public showBackground?: boolean;
	public modalSize?: ModalSize;
	// Helps to determinate if the default state was show or hide
	private _defaultShowBackground ? = true;

	constructor() {
		this.showBackground = this._defaultShowBackground;
		this.modalSize = ModalSize.SM;
	}

	/**
	 * Change the default
	 * @param showBackground
	 */
	public setDefaultShowBackground?(value: boolean): void {
		this._defaultShowBackground = value;
	}

	/**
	 * Get the Default State
	 */
	public getDefaultShowBackground?(): boolean {
		return this._defaultShowBackground;
	}

}

/**
 * Dialog Model to Open
 */
export class DialogModel {
	public componentFactoryResolver: ComponentFactoryResolver;
	public component: any;
	public data: any;
	public modalConfiguration: ModalConfigurationModel;
	public observable?: Observer<any>;
}

/**
 * Event Type for Dialog Status
 */
export enum DialogEventType {
	OPEN = 'dialog-event-type-open',
	CLOSE = 'dialog-event-type-close'
}

export enum ModalSize {
	SM = 'sm',
	MD = 'none',
	LG = 'lg',
	XL = 'xl',
	CUSTOM = 'custom'
}
