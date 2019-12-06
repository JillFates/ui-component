import { Component } from '@angular/core';
import { GridRowAction } from 'libs/tds-component-library/src';

@Component({
	selector: 'app-grid-internal-overview',
	templateUrl: './grid-internal-overview.component.html',
	styleUrls: ['./grid-internal-overview.component.scss'],
})
export class GridInternalOverviewComponent {
	protected gridRowActions: GridRowAction[] = [
		{ name: 'View', show: true, disabled: false, onClick: this.viewAlert },
		{ name: 'Edit', show: true, disabled: false, onClick: this.editAlert },
		{ name: 'Info', show: true, disabled: false, onClick: this.infoAlertAsync },
		{
			name: 'Disabled',
			show: true,
			disabled: true,
			onClick: this.infoAlertAsync
		},
		{
			name: 'Not Shown',
			show: false,
			disabled: false,
			onClick: this.infoAlertAsync
		},
	];

	constructor() {
		//
	}

	/**
	 * Creates an alert when clicked
	 * @param event - on click event
	 */
	private viewAlert(event: Event, dataItem: DataItem): void {
		console.log(event);
		event.stopPropagation();
		alert(`View clicked. See the console for the logged event. The data item is: ${JSON.stringify(dataItem)}`);
	}

	/**
	 * Creates an alert when clicked
	 */
	private editAlert(event: Event, dataItem: DataItem): void {
		alert(`Edit clicked. The data item is: ${JSON.stringify(dataItem)}`);
	}

	/**
	 * Creates an alert when clicked
	 */
	private async infoAlertAsync(event: Event, dataItem: DataItem): Promise<void> {
		await new Promise(res => setTimeout(res, 2000));
		alert(
			`Info clicked. This was an async function and resolved after two seconds. The data item is: ${JSON.stringify(
				dataItem
			)}`
		);
	}
}

interface DataItem {
	id: number;
	name: string;
}
