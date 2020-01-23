import {ComponentFactoryResolver} from '@angular/core';
import {Observer} from 'rxjs';

export class ModalConfigurationModel {
	public title?: string;
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
	public modalConfiguration?: ModalConfigurationModel;
	public observable?: Observer<any>;
}

/**
 * Event Type for Dialog Status
 */
export enum DialogEventType {
	OPEN = 'dialog-event-type-open',
	CLOSE = 'dialog-event-type-close'
}

export enum DialogExit {
	ACCEPT = 'accept',
	CLOSE = 'close'
}

export enum ModalSize {
	SM = 'sm',
	MD = 'md',
	LG = 'lg',
	XL = 'xl'
}

export enum DialogButtonType {
	ACTION = 'action',
	CONTEXT = ''
}
/**
 * Dialog Model to Open
 */
export class DialogButtonModel {
	public name?: string;
	public text?: string;
	public icon?: string;
	public type?: DialogButtonType;
	public show?: boolean;
	public disabled?: boolean;
	public action?: Function;
}
