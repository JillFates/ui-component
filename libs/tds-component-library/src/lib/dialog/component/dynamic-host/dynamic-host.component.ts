/**
 * Place holder to use dynamically inject dialog component on runtime
 */
import {Component, HostListener, ViewChild} from '@angular/core';
import {DynamicHostDirective} from '../../directive/dynamic-host.directive';
import {ModalConfigurationModel} from '../../model/dialog.model';

@Component({
	selector: 'tds-dynamic-host',
	styleUrls: ['./dynamic-host.component.scss'],
	templateUrl: './dynamic-host.component.html',
})
export class DynamicHostComponent {
	public modalConfigurationModel = new ModalConfigurationModel();
	public currentDialogComponentInstance: any;
	public isDialogOpen = false;
	@ViewChild(DynamicHostDirective, {static: true}) dynamicContent: DynamicHostDirective;

	/**
	 * On Accept
	 */
	public onAccept(): void {
		if (this.currentDialogComponentInstance) {
			this.currentDialogComponentInstance.onAccept();
		}
	}

	/**
	 * On Cancel
	 */
	public onCancel(): void {
		if (this.currentDialogComponentInstance) {
			this.currentDialogComponentInstance.onCancel();
		}
	}
}
