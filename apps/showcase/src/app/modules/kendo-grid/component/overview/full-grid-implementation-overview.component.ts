import { Component } from '@angular/core';
import {
	COLUMN_MIN_WIDTH,
	ColumnHeaderData,
	DataGridHelper,
	GridSettings, HeaderActionButtonData
} from 'libs/tds-component-library/src';
import { AssetColumnsModel, AssetData } from '../model/asset-columns.model';

@Component({
	selector: 'app-full-grid-implementation',
	templateUrl: './full-grid-implementation-overview.component.html',
	styleUrls: [],
})
export class FullGridImplementationOverviewComponent {
	gridHelper: DataGridHelper;
	gridColumns: Array<ColumnHeaderData>;
	showFilters: boolean;
	COLUMN_MIN_WIDTH = COLUMN_MIN_WIDTH;
	headerActionButtons: HeaderActionButtonData[];
	private readonly gridSettings: GridSettings;

	constructor() {
		this.showFilters = false;
		this.gridSettings = {
			checkboxSelectionConfig: { useColumn: 'id' },
			defaultSort: [{ dir: 'asc', field: 'assetName' }],
			selectableSettings: { mode: 'single', checkboxOnly: false },
			sortSettings: { mode: 'single' },
			resizable: true,
			pageable: true,
			filterable: true
		};
		this.gridColumns = AssetColumnsModel;
		const gridData: Array<any> = [...AssetData];
		for (let i = 0; i < 100; i++) {
			gridData.push({
				id: i,
				assetName: this.makeid(8),
				comment: this.makeid(32),
				userSelectedCol0: gridData[i].userSelectedCol0 === 'general' ? 'other' : 'general',
				userSelectedCol1: '30/09/2019 04:31 PM',
				checked: !gridData[i].checked,
			});
		}
		this.gridHelper = new DataGridHelper(
			gridData,
			this.gridSettings);
		this.headerActionButtons = [
			{
				icon: 'plus',
				iconClass: 'is-solid',
				title: 'Create',
				show: true,
				onClick: () => console.log('create'),
			},
			{
				icon: 'pencil',
				title: 'Bulk Edit',
				show: true,
				onClick: () => console.log('bulk edit'),
			},
		];
	}

	/**
	 * Generate random string text.
	 * @param length
	 */
	private makeid(length: number): string {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for ( let i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	/**
	 * On Cell click event.
	 * @param $event
	 */
	onCellClick($event: any): void {
		console.log($event);
	}

	/**
	 * On toggle Filter.
	 */
	toggleFilter(): void {
		this.showFilters = !this.showFilters;
	}

	/**
	 * On refresh() grid.
	 */
	onRefresh(): void {
		console.log('refresh grid');
	}
}
