import { DropdownEscapeComponent } from './../dropdown-escape/dropdown-escape.component';
import { ModalSize } from './../../../../../../../../libs/tds-component-library/src/lib/dialog/model/dialog.model';
import { Component, ComponentFactoryResolver } from '@angular/core';
import { DialogService } from '../../../../../../../../libs/tds-component-library/src/lib/dialog/service/dialog.service';

@Component({
	selector: 'app-dialog-dropdown-overview',
	templateUrl: './dialog-dropdown-overview.component.html',
})
export class DialogDropdownOverviewComponent {
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
				component: DropdownEscapeComponent,
				data: null,
				modalConfiguration: {
					title: 'Trying out?',
					modalSize: ModalSize.SM,
				},
			})
			.subscribe((data: any) => {
				console.log('Dropdown Escape Dialog was closed successfully: ', data);
			});
	}
}
