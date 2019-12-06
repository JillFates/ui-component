import { Component } from '@angular/core';
import {
	GridRowAction,
	HeaderActionButtonData,
	GridModel,
	ColumnHeaderData,
	GridSettings,
} from 'libs/tds-component-library/src';
import { exampleColumnModel, exampleGridData } from './grid-data';
import { CellClickEvent } from '@progress/kendo-angular-grid';

@Component({
	selector: 'app-grid-overview',
	templateUrl: './grid-overview.component.html',
	styleUrls: ['./grid-overview.component.scss'],
})
export class GridOverviewComponent {
	private gridRowActions: GridRowAction[] = [
		{ name: 'View', show: true, disabled: false, onClick: this.viewAlert },
		{ name: 'Edit', show: true, disabled: false, onClick: this.editAlert },
		{ name: 'Delete', show: true, disabled: false, onClick: this.deleteAlertAsync },
	];

	private headerActions: HeaderActionButtonData[] = [
		{ icon: 'plus', title: 'create', disabled: false, show: true, onClick: this.createAlert },
	];

	private columnModel: ColumnHeaderData[] = exampleColumnModel;

	private gridSettings: GridSettings = {
		defaultSort: [
			{
				field: 'taskNumber',
				dir: 'asc',
			},
		],
		filterable: true,
		pageable: true,
		sortSettings: { mode: 'single' },
		resizable: true,
	};

	protected gridModel: GridModel = {
		columnModel: this.columnModel,
		gridRowActions: this.gridRowActions,
		gridSettings: this.gridSettings,
		headerActionButtons: this.headerActions,
		showDataReloadButton: true,
		loadData: this.loadData,
	};

	constructor() {
		//
	}

	/**
	 * This function loads the data for the grid. Passed in the gridModel.
	 */
	private loadData(event?: Event): any {
		let data = exampleGridData;
		for (let index = 0; index < 4; index++) {
			data = data.concat(exampleGridData);
		}
		return data;
	}

	/**
	 * Function executes on cell click.
	 * @param cellData
	 */
	protected onCellClick(event: CellClickEvent): void {
		console.log(event);
	}

	/**
	 * Creates an alert when clicked
	 * @param event - on click event
	 */
	private viewAlert(event: Event, dataItem: CellClickEvent): void {
		console.log(event);
		event.stopPropagation();
		alert(`View clicked. See the console for the logged event. The CellClickEvent is: ${JSON.stringify(dataItem)}`);
	}

	/**
	 * Creates an alert when clicked
	 * @param event - on click event
	 */
	private createAlert(event: Event): void {
		console.log(event);
		event.stopPropagation();
		alert('Create clicked. See the console for the logged event.');
	}

	/**
	 * Creates an alert when clicked
	 */
	private editAlert(event: Event, dataItem: CellClickEvent): void {
		alert(`Edit clicked. The CellClickEvent is: ${JSON.stringify(dataItem)}`);
	}

	/**
	 * Creates an alert when clicked
	 */
	private async deleteAlertAsync(event: Event, dataItem: CellClickEvent): Promise<void> {
		await new Promise(res => setTimeout(res, 2000));
		alert(
			`Delete clicked. This was an async function and resolved after two seconds. The CellClickEvent is: ${JSON.stringify(
				dataItem
			)}`
		);
	}
}
