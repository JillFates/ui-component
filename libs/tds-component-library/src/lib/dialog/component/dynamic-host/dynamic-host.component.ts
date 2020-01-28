/**
 * Place holder to use dynamically inject dialog component on runtime
 */
// Angular
import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
// Model
import {DialogButtonModel, DialogButtonType, ModalConfigurationModel, ModalSize} from '../../model/dialog.model';
import {faExpandArrowsAlt, faCompressArrowsAlt} from '@fortawesome/free-solid-svg-icons';
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
	// Full Screen
	public showFullScreen = false;
	public fullScreen = false;
	// Icons
	public faExpandArrowsAlt = faExpandArrowsAlt;
	public faCompressArrowsAlt = faCompressArrowsAlt;

	@ViewChild(DynamicHostDirective, {static: true}) dynamicContent: DynamicHostDirective;
	@ViewChild('dialogContainer', {static: true}) dialogContainer: ElementRef;
	@ViewChild('dialogContent', {static: true}) dialogContent: ElementRef;

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

				if (this.modalConfigurationModel.fullScreen || this.modalConfigurationModel.defaultFullScreen) {
					this.showFullScreen = true;
					this.fullScreen = this.modalConfigurationModel.defaultFullScreen;
				}
			}
		});
	}

	/**
	 * On Resize Finish
	 * @param event
	 */
	public onResizeEnd(event: any): void {
		if (event.rectangle.width !== 0 && event.rectangle.height !== 0 && this.modalConfigurationModel.resizable) {
			this.renderer.setStyle(this.dialogContainer.nativeElement, 'width', `${event.rectangle.width}px`);
			this.renderer.setStyle(this.dialogContainer.nativeElement, 'height', `${event.rectangle.height}px`);
			this.renderer.setStyle(this.dialogContent.nativeElement, 'width', `${event.rectangle.width}px`);
			this.renderer.setStyle(this.dialogContent.nativeElement, 'height', `${event.rectangle.height}px`);
		}
	}

	/**
	 * Maximize the Dialog
	 * @param event
	 */
	public maximizeDialog(event: any): void {
		this.fullScreen = true;
	}

	/**
	 * Minimize the Dialog
	 * @param event
	 */
	public minimizeDialog(event: any): void {
		this.fullScreen = false;
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
