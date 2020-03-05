import { Component } from '@angular/core';
import { DialogService } from '../../../../../../../../libs/tds-component-library/src/lib/dialog/service/dialog.service';

@Component({
	selector: 'app-dialog-dropdown-overview',
	templateUrl: './dialog-dropdown-overview.component.html',
})
export class DialogDropdownOverviewComponent {
	constructor(private dialogService: DialogService) {
		//
	}

	/**
	 * Open a Confirmation Dialog
	 */
	public openDialogDropdown(): void {
		this.dialogService
			.freezeEscape(
				'Trying out?',
				'Try dropping down, and then use the esc key. This dialog box will not dismiss. '
			)
			.subscribe((result: any) => {
				console.log('Confirmation Action was: ', result);
			});
	}
}
