import {ComponentFactoryResolver} from '@angular/core';
import {Observer} from 'rxjs';

export class ModalConfigurationModel {
	public showBackground?: boolean;
	public modalSize?: ModalSize;
	constructor() {
		this.showBackground = true;
		this.modalSize = ModalSize.SM;
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
