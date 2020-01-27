/**
 * Place holder to use dynamically inject dialog component on runtime
 */
// Angular
import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
// Modal
import {DialogButtonModel, DialogButtonType, ModalConfigurationModel, ModalSize} from '../../model/dialog.model';
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
	public dialogButtonType = DialogButtonType;

	@ViewChild(DynamicHostDirective, {static: true}) dynamicContent: DynamicHostDirective;
	@ViewChild('dialogContainer', {static: true}) dialogContainer: ElementRef;

	constructor(private renderer: Renderer2) {
	}

	ngOnInit(): void {
		setTimeout(() => {
			if (!this.currentDialogComponentInstance) {
				// if instance is empty, does not show anything
				this.showActionButtons = this.showContextButtons = this.showLeftActionButtonsPanel = false;
			} else {
				const actionButtons = this.currentDialogComponentInstance.buttons.filter((button: DialogButtonModel) => {
					return button.type === DialogButtonType.ACTION;
				});
				const contextButtons = this.currentDialogComponentInstance.buttons.filter((button: DialogButtonModel) => {
					return button.type === DialogButtonType.CONTEXT;
				});

				if (!actionButtons || actionButtons.length === 0) {
					this.showLeftActionButtonsPanel = false;
				} else if (actionButtons && actionButtons.length > 0) {
					this.showLeftActionButtonsPanel = this.showActionButtons = true;
				}

				this.showContextButtons = (contextButtons && contextButtons.length > 0);
			}
		});
	}

	/**
	 * On Resize Finish
	 * @param event
	 */
	public onResizeEnd(event: any): void {
		this.renderer.setStyle(this.dialogContainer.nativeElement, 'width', `${event.size.width}px`);
		this.renderer.setStyle(this.dialogContainer.nativeElement, 'height', `${event.size.height}px`);
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
