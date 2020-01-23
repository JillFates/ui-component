/**
 * Place holder to use dynamically inject dialog component on runtime
 */
// Angular
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
// Modal
import {ModalConfigurationModel, ModalSize} from '../../model/dialog.model';
// Directive
import {DynamicHostDirective} from '../../directive/dynamic-host.directive';
import {Dialog} from '../../model/dialog.interface';

@Component({
	selector: 'tds-dynamic-host',
	styleUrls: ['./dynamic-host.component.scss'],
	encapsulation: ViewEncapsulation.None,
	templateUrl: './dynamic-host.component.html',
})
export class DynamicHostComponent implements OnInit {
	public modalConfigurationModel = new ModalConfigurationModel();
	public currentDialogComponentInstance: Dialog;
	public isDialogOpen = false;
	public modalSize = ModalSize;
	// Show Hide Sections
	public showLeftActionButtonsPanel = false;
	public showActionButtons = false;
	public showContextButtons = false;

	@ViewChild(DynamicHostDirective, {static: true}) dynamicContent: DynamicHostDirective;

	ngOnInit(): void {
		setTimeout(() => {
			this.showLeftActionButtonsPanel = !(!this.currentDialogComponentInstance ||
				!this.currentDialogComponentInstance.actionButtons ||
				this.currentDialogComponentInstance.actionButtons.length === 0);

			if (this.currentDialogComponentInstance) {
				this.showActionButtons = (
					this.currentDialogComponentInstance.actionButtons &&
					this.currentDialogComponentInstance.actionButtons.length > 0
				);

				this.showContextButtons = (
					this.currentDialogComponentInstance.contextButtons &&
					this.currentDialogComponentInstance.contextButtons.length > 0
				);
			}
		});
	}

	/**
	 * On Dismiss
	 */
	public onDismiss(): void {
		if (this.currentDialogComponentInstance) {
			this.currentDialogComponentInstance.onDismiss();
		}
	}
}
