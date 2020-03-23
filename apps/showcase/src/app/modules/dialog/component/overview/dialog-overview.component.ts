import { DialogTooltipComponent } from './../../../dialog-tooltip/component/dialog-tooltip/dialog-tooltip.component';
// Angular
// Service
import { DialogService } from '../../../../../../../../libs/tds-component-library/src/lib/dialog/service/dialog.service';
// Component
import { BasicDialogComponent } from '../basic-dialog/basic-dialog.component';
import { MultipleDialogComponent } from '../multiple-dialog/multiple-dialog.component';
import { NoBackgroundDialogComponent } from '../no-background-dialog/no-background-dialog.component';
import { ButtonActionDialogComponent } from '../button-action-dialog/button-action-dialog.component';
import { ButtonContextDialogComponent } from '../button-context-dialog/button-context-dialog.component';
import { ButtonActionContextDialogComponent } from '../button-action-context-dialog/button-action-context-dialog.component';
import { Component, ComponentFactoryResolver } from '@angular/core';

// Model
import { ModalSize } from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.model';
import { ReactiveButtonsDialogComponent } from '../reactive-buttons-dialog/reactive-buttons-dialog.component';

@Component({
	selector: 'app-dialog-overview',
	templateUrl: './dialog-overview.component.html',
	styleUrls: ['./dialog-overview.component.scss'],
})
export class DialogOverviewComponent {
	public modelSize = ModalSize;

	constructor(private dialogService: DialogService, private componentFactoryResolver: ComponentFactoryResolver) {
		//
	}

	/**
	 * Open a Basic Dialog
	 */
	public openDialog(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: BasicDialogComponent,
				data: null,
				modalConfiguration: {
					title: 'Basic Dialog',
					modalSize: ModalSize.SM,
				},
			})
			.subscribe((data: any) => {
				console.log('Basic Dialog was closed successfully: ', data);
			});
	}

	/**
	 * Open a Multiple Dialog
	 */
	public openMultipleDialogs(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: MultipleDialogComponent,
				data: null,
				modalConfiguration: {
					title: 'Multiple Dialog',
					modalSize: ModalSize.LG,
				},
			})
			.subscribe((data: any) => {
				console.log('Multiple Dialog was closed successfully: ', data);
			});
	}

	/**
	 * Open a Dialog without Background
	 */
	public openNoBackgroundDialogs(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: NoBackgroundDialogComponent,
				data: null,
				modalConfiguration: {
					title: 'No Background',
					showBackground: false,
				},
			})
			.subscribe((data: any) => {
				console.log('No Background Dialog was closed successfully: ', data);
			});
	}

	/**
	 * Open a Basic Dialog with different Size
	 */
	public openSize(modelSize: ModalSize): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: BasicDialogComponent,
				data: null,
				modalConfiguration: {
					title: 'Dialog Size ' + modelSize,
					modalSize: modelSize,
				},
			})
			.subscribe((data: any) => {
				console.log('Dialog with Size was closed successfully: ', data);
			});
	}

	/**
	 * Open an Dialog with Action Buttons
	 */
	public openActionButtonDialog(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: ButtonActionDialogComponent,
				data: null,
				modalConfiguration: {
					title: 'Action Buttons',
					modalSize: ModalSize.MD,
				},
			})
			.subscribe((data: any) => {
				console.log('Action Buttons Dialog was closed successfully: ', data);
			});
	}

	/**
	 * Open an Dialog with Action Buttons
	 */
	public openDialogWithTooltip(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: DialogTooltipComponent,
				data: null,
				modalConfiguration: {
					title: 'Dialog with Tooltip',
					modalSize: ModalSize.MD,
				},
			})
			.subscribe((data: any) => {
				console.log('Dialog with Tooltip was closed successfully: ', data);
			});
	}

	/**
	 * Open an Dialog with Context Buttons
	 */
	public openContextButtonDialog(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: ButtonContextDialogComponent,
				data: null,
				modalConfiguration: {
					title: 'Context Buttons',
					modalSize: ModalSize.MD,
				},
			})
			.subscribe((data: any) => {
				console.log('Context Buttons Dialog was closed successfully: ', data);
			});
	}

	/**
	 * Open an Dialog with Action and Context Buttons
	 */
	public openActionContextButtonDialog(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: ButtonActionContextDialogComponent,
				data: null,
				modalConfiguration: {
					title: 'Action and Context Buttons',
					modalSize: ModalSize.MD,
				},
			})
			.subscribe((data: any) => {
				console.log('Action and Context Buttons Dialog was closed successfully: ', data);
			});
	}

	/**
	 * Open a Reactive Buttons Dialog
	 */
	public openReactiveActionButtonDialog(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: ReactiveButtonsDialogComponent,
				data: null,
				modalConfiguration: {
					title: 'Reactive Buttons',
					modalSize: ModalSize.MD,
				},
			})
			.subscribe((data: any) => {
				console.log('Reactive Buttons Dialog was closed successfully: ', data);
			});
	}

	/**
	 * Open a Headless Basic Dialog
	 */
	public openHeadlessDialog(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: BasicDialogComponent,
				data: null,
				modalConfiguration: {
					modalSize: ModalSize.SM,
				},
			})
			.subscribe((data: any) => {
				console.log('Headless Dialog was closed successfully: ', data);
			});
	}

	/**
	 * Open a Basic Dialog
	 */
	public openDraggable(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: BasicDialogComponent,
				data: null,
				modalConfiguration: {
					title: 'Basic Draggable Dialog',
					draggable: true,
					modalSize: ModalSize.MD,
				},
			})
			.subscribe((data: any) => {
				console.log('Basic Draggable Dialog was closed successfully: ', data);
			});
	}

	/**
	 * Open a Basic Dialog
	 */
	public openResizable(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: BasicDialogComponent,
				data: null,
				modalConfiguration: {
					title: 'Basic Resizable Dialog',
					resizable: true,
					modalSize: ModalSize.MD,
				},
			})
			.subscribe((data: any) => {
				console.log('Basic Resizable Dialog was closed successfully: ', data);
			});
	}

	/**
	 * Open a Basic Dialog Full Screen
	 */
	public openFullScreenConfig(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: BasicDialogComponent,
				data: null,
				modalConfiguration: {
					title: 'Basic Full Screen Dialog',
					fullScreen: true,
					modalSize: ModalSize.MD,
				},
			})
			.subscribe((data: any) => {
				console.log('Basic Full Screen Dialog was closed successfully: ', data);
			});
	}

	/**
	 * Open a Basic Dialog Default On Full Screen
	 */
	public openDefaultFullScreenConfig(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: BasicDialogComponent,
				data: null,
				modalConfiguration: {
					title: 'Basic Default Full Screen Dialog',
					defaultFullScreen: true,
					modalSize: ModalSize.MD,
				},
			})
			.subscribe((data: any) => {
				console.log('Basic Defaul Full Screen Dialog was closed successfully: ', data);
			});
	}
}
