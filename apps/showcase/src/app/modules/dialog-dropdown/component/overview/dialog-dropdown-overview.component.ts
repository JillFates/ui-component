import {Component} from '@angular/core';
import {DialogService} from '../../../../../../../../libs/tds-component-library/src/lib/dialog/service/dialog.service';

@Component({
	selector: 'app-dialog-dropdown-overview',
	templateUrl: './dialog-dropdown-overview.component.html',
})
export class DialogDropdownOverviewComponent {

	constructor(
		private dialogService: DialogService) {
		//
	}

	/**
	 * Open a Confirmation Dialog
	 */
	public openDialogDropdown(): void {
		this.dialogService.freezeEscape(
			'Abandon Changes?',
			'You have unsaved changes. Click Confirm to abandon your changes')
			.subscribe((result: any) => {
				console.log('Confirmation Action was: ', result);
			});
	}

}