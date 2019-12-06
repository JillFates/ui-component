import { Component, OnInit } from '@angular/core';
import { GridRowAction } from 'libs/tds-component-library/src';

@Component({
	selector: 'app-grid-internal-overview',
	templateUrl: './grid-internal-overview.component.html',
	styleUrls: ['./grid-internal-overview.component.scss'],
})
export class GridInternalOverviewComponent implements OnInit {
	protected gridRowActions: GridRowAction[];

	constructor() {
		//
	}

	ngOnInit(): void {
		this.gridRowActions = [
			{ name: 'View', show: true, disabled: false, onClick: this.viewAlert },
			{ name: 'Edit', show: true, disabled: false, onClick: this.editAlert },
			{ name: 'Info', show: true, disabled: false, onClick: this.infoAlertAsync },
			{
				name: 'Disabled',
				show: true,
				disabled: true,
				onClick: this.infoAlertAsync,
			},
			{
				name: 'Not Shown',
				show: false,
				disabled: false,
				onClick: this.infoAlertAsync,
			},
		];
	}
	public viewAlert = (dataItem: any): void => {
		alert(`View clicked.`);
	}

	public editAlert = (dataItem: any): void => {
		alert(`Edit clicked`);
	}

	public infoAlertAsync = async (dataItem: any): Promise<void> => {
		await new Promise(res => setTimeout(res, 2000));
		alert(`Info clicked. This was an async function and resolved after two seconds.`);
	}
}
