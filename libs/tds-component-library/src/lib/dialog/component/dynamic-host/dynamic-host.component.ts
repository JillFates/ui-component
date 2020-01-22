/**
 * Place holder to use dynamically inject dialog component on runtime
 */
// Angular
import {Component, ViewChild} from '@angular/core';
// Modal
import {ModalConfigurationModel, ModalSize} from '../../model/dialog.model';
// Directive
import {DynamicHostDirective} from '../../directive/dynamic-host.directive';

@Component({
	selector: 'tds-dynamic-host',
	styleUrls: ['./dynamic-host.component.scss'],
	templateUrl: './dynamic-host.component.html',
})
export class DynamicHostComponent {
	public modalConfigurationModel = new ModalConfigurationModel();
	public currentDialogComponentInstance: any;
	public isDialogOpen = false;
	public modalSize = ModalSize;
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
