// Angular
import {Component, ComponentFactoryResolver} from '@angular/core';
// Service
import {DialogService} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/service/dialog.service';
// Component
import {BasicDialogComponent} from '../basic-dialog/basic-dialog.component';
import {MultipleDialogComponent} from '../multiple-dialog/multiple-dialog.component';
// Model
import {
	ModalSize
} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.model';
import {NoBackgroundDialogComponent} from '../no-background-dialog/no-background-dialog.component';

@Component({
	selector: 'app-dialog-overview',
	templateUrl: './dialog-overview.component.html',
	styleUrls: ['./dialog-overview.component.scss'],
})
export class DialogOverviewComponent {
	constructor(
		private dialogService: DialogService,
		private componentFactoryResolver: ComponentFactoryResolver) {
		//
	}

	/**
	 * Open a Basic Dialog
	 */
	public openDialog(): void {
		this.dialogService.open({
			componentFactoryResolver: this.componentFactoryResolver,
			component: BasicDialogComponent,
			data: null,
			modalConfiguration: {
				modalSize: ModalSize.SM
			}
		}).subscribe((data: any) => {
			console.log('Basic Dialog was closed successfully: ', data);
		});
	}

	/**
	 * Open a Multiple Dialog
	 */
	public openMultipleDialogs(): void {
		this.dialogService.open({
			componentFactoryResolver: this.componentFactoryResolver,
			component: MultipleDialogComponent,
			data: null,
			modalConfiguration: {
				modalSize: ModalSize.LG,
			}
		}).subscribe((data: any) => {
			console.log('Multiple Dialog was closed successfully: ', data);
		});
	}

	/**
	 * Open a Multiple Dialog
	 */
	public openNoBackgroundDialogs(): void {
		this.dialogService.open({
			componentFactoryResolver: this.componentFactoryResolver,
			component: NoBackgroundDialogComponent,
			data: null,
			modalConfiguration: {
				showBackground: false
			}
		}).subscribe((data: any) => {
			console.log('No Background Dialog was closed successfully: ', data);
		});
	}
}
