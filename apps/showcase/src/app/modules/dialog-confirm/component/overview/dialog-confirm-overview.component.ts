// Angular
import {Component} from '@angular/core';
// Service
import {DialogService} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/service/dialog.service';

@Component({
	selector: 'app-dialog-confirm-overview',
	templateUrl: './dialog-confirm-overview.component.html',
	styleUrls: ['./dialog-confirm-overview.component.scss'],
})
export class DialogConfirmOverviewComponent {

	constructor(
		private dialogService: DialogService) {
		//
	}

	/**
	 * Open a Confirmation Dialog
	 */
	public openConfirm(): void {
		this.dialogService.confirm(
			'Abandon Changes?',
			'You have unsaved changes. Click Confirm to abandon your changes')
			.subscribe((result: any) => {
				console.log('Confirmation Action was: ', result);
			});
	}
}
