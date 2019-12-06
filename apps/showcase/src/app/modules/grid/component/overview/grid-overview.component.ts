import { Component, OnInit } from '@angular/core';
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
export class GridOverviewComponent implements OnInit {
	private gridRowActions: GridRowAction[];

	private headerActions: HeaderActionButtonData[];

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

	protected gridModel: GridModel;
	constructor() {
		//
	}
	ngOnInit(): void {
		this.gridRowActions = [
			{ name: 'View', show: true, disabled: false, onClick: this.viewAlert },
			{ name: 'Edit', show: true, disabled: false, onClick: this.editAlert },
			{ name: 'Delete', show: true, disabled: false, onClick: this.deleteAlertAsync },
		];

		this.headerActions = [
			{ icon: 'plus', title: 'create', disabled: false, show: true, onClick: this.createAlert },
		];

		this.gridModel = {
			columnModel: this.columnModel,
			gridRowActions: this.gridRowActions,
			gridSettings: this.gridSettings,
			headerActionButtons: this.headerActions,
			showDataReloadButton: true,
			loadData: this.loadData,
		};
	}

	public viewAlert = (dataItem: any): void => {
		alert(`View clicked. The dataItem is: ${JSON.stringify(dataItem)}`);
	}

	public createAlert = (): void => {
		alert(`Create clicked.`);
	}

	public editAlert = (dataItem: any): void => {
		alert(`Edit clicked. The dataItem is: ${JSON.stringify(dataItem)}`);
	}

	public loadData = (): any => {
		let data = exampleGridData;
		for (let index = 0; index < 4; index++) {
			data = data.concat(exampleGridData);
		}
		return data;
	}

	public deleteAlertAsync = async (dataItem: any): Promise<void> => {
		await new Promise(res => setTimeout(res, 2000));
		alert(
			`Delete clicked. This was an async function and resolved after two seconds. The dataItem is: ${JSON.stringify(
				dataItem
			)}`
		);
	}

	/**
	 * Cell click handler
	 * @param event The cell click event
	 */
	public onCellClick(event: CellClickEvent): void {
		alert('See the console for the event.');
		console.log(event);
	}
}
