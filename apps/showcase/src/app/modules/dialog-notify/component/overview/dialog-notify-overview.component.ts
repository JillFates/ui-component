// Angular
import {Component} from '@angular/core';
// Service
import {DialogService} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/service/dialog.service';

@Component({
	selector: 'app-dialog-notify-overview',
	templateUrl: './dialog-notify-overview.component.html',
	styleUrls: ['./dialog-notify-overview.component.scss'],
})
export class DialogNotifyOverviewComponent {

	constructor(
		private dialogService: DialogService) {
		//
	}

	/**
	 * Open a Confirmation Dialog
	 */
	public openNotify(): void {
		this.dialogService.notify(
			'Alert',
			'This is a notification Message')
			.subscribe((result: any) => {
				console.log('Notification Action was: ', result);
			});
	}
}
