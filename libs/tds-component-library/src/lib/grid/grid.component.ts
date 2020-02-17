import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridModel, FilterType } from '../models/grid-models';
import { DataGridHelper } from '../helpers/data-grid-helper';
import { CellClickEvent } from '@progress/kendo-angular-grid';

@Component({
	selector: 'tds-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
	public disableClearFilters: Function;

	constructor() {
		//
	}
	public gridHelper: DataGridHelper;

	/**
	 * Grid model to be used in displaying the grid.
	 */
	@Input() gridModel: GridModel;

	/**
	 * string classes to be applied to the kendo grid
	 */
	@Input() class: string;

	/**
	 * Emits cell click events.
	 */
	@Output() cellClick = new EventEmitter<CellClickEvent>();

	public filterType = FilterType;
	public showFilters = false;
	public value: Date = new Date(2000, 2, 10);

	public reloadData = async (): Promise<void> => {
		const gridData: any = await this.gridModel.loadData();
		this.gridHelper.reloadData(gridData);
	}

	/**
	 * init component
	 */
	async ngOnInit(): Promise<void> {
		this.disableClearFilters = this.onDisableClearFilter.bind(this);

		// First, we load the data.
		const gridData: any = await this.gridModel.loadData();

		// Next, we pass the grid data to the data-grid-helper.
		this.gridHelper = new DataGridHelper(gridData, this.gridModel.gridSettings);

	}

	/**
	 * Gets the number of active row actions.
	 */
	public numberRowActions(): number {
		return this.gridModel.gridRowActions.filter(x => x.show).length + 1;
	}

	/**
	 * Toggles the grid filter
	 */
	public toggleFilters(): void {
		this.showFilters = !this.showFilters;
	}

	/**
	 * Gets the number of grid filters
	 */
	public filterCount(): number {
		return this.gridModel.columnModel.filter(x => {
			let isFiltering = false;
			if (x.filterType === this.filterType.boolean) {
				isFiltering = x.filter === true || x.filter === '';
			} else {
				isFiltering = x.filter && x.filter.length > 0;
			}
			return isFiltering;
		}).length;
	}

	/**
	 * Checks if filters are applied.
	 */
	public hasFilterApplied(): boolean {
		return this.filterCount() > 0;
	}

	/**
	 * Emits a cell click event
	 * @param cellClickEvent
	 */
	public onCellClick(cellClickEvent: CellClickEvent): void {
		// Want to surpress action column clicks.
		if (this.gridModel.gridRowActions && cellClickEvent.columnIndex === 0) {
			return;
		}
		this.cellClick.emit(cellClickEvent);
	}

	/**
	 * Make the entire header clickable on Grid.
	 * @param event
	 */
	public onHeaderClick(event: any): void {
		if (event.target && event.target.parentNode) {
			event.target.parentNode.click();
		}
	}

	/**
	 * Disable clear filters
	 */
	private onDisableClearFilter(): boolean {
		return !this.hasFilterApplied();
	}

	/**
	 * Clear all selected filters
	 * @param event
	 */
	public onClearFilters(): void {
		this.gridHelper.clearAllFilters(this.gridModel.columnModel);
		this.reloadData();
	}
}
