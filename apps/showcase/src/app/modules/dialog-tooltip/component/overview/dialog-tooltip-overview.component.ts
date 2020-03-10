import { DialogTooltipComponent } from './../dialog-tooltip/dialog-tooltip.component';
import { ModalSize } from './../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.model';
import { DialogService } from './../../../../../../../../libs/tds-component-library/src/lib/dialog/service/dialog.service';
import { Component, ComponentFactoryResolver } from '@angular/core';

@Component({
	selector: 'app-dialog-tooltip-overview',
	templateUrl: './dialog-tooltip-overview.component.html',
})
export class DialogTooltipOverviewComponent {
	constructor(private dialogService: DialogService, private componentFactoryResolver: ComponentFactoryResolver) {
		//
	}

	/**
	 * Open a Confirmation Dialog
	 */
	public openDialogDropdown(): void {
		this.dialogService
			.open({
				componentFactoryResolver: this.componentFactoryResolver,
				component: DialogTooltipComponent,
				data: null,
				modalConfiguration: {
					title: 'Trying out?',
					modalSize: ModalSize.SM,
				},
			})
			.subscribe((data: any) => {
				console.log('Dialog Tooltip was closed successfully: ', data);
			});
	}
}
