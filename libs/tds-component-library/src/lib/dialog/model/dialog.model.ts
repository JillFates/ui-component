import {ComponentFactoryResolver} from '@angular/core';
import {Observer} from 'rxjs';

export class ModalConfigurationModel {
	public title?: string;
	public showBackground?: boolean;
	public modalSize?: ModalSize;
	public draggable?: boolean;
	public resizable?: boolean;
	public fullScreen?: boolean;
	public defaultFullScreen?: boolean;
	// Helps to determinate default values
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
	public content?: any;
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
	XL = 'xl',
	CONFIRM = 'confirm',
	CUSTOM = 'custom'
}

export enum DialogButtonType {
	ACTION = 'action',
	CONTEXT = 'context'
}

export enum DialogConfirmAction {
	CONFIRM = 'confirm',
	CANCEL = 'cancel'
}

/**
 * Dialog Model to Open
 */
export class DialogButtonModel {
	public name?: string;
	public text?: string;
	public icon?: string;
	public type?: DialogButtonType;
	public show?: Function;
	public active?: Function;
	public disabled?: Function;
	public action?: Function;
}
