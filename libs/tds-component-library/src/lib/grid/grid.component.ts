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
	protected gridHelper: DataGridHelper;

	/**
	 * Grid model to be used in displaying the grid.
	 */
	@Input() gridModel: GridModel;
	/**
	 * Emits cell click events.
	 */
	@Output() cellClick = new EventEmitter<CellClickEvent>();
	protected filterType = FilterType;
	protected showFilters = false;

	public value: Date = new Date(2000, 2, 10);
	constructor() {
		//
	}

	/**
	 * init component
	 */
	async ngOnInit(): Promise<void> {
		// First, we load the data.
		const gridData: any = await this.gridModel.loadData();

		// Next, we pass the grid data to the data-grid-helper.
		this.gridHelper = new DataGridHelper(gridData, this.gridModel.gridSettings);

		// Now we'll set up the action buttons.
		if (this.gridModel.showDataReloadButton) {
			this.gridModel.headerActionButtons.unshift({
				icon: 'sync',
				title: 'Reload',
				disabled: false,
				show: true,
				onClick: this.gridModel.loadData,
			});
		}
	}

	/**
	 * Gets the number of active row actions.
	 */
	protected numberRowActions(): number {
		return this.gridModel.gridRowActions.filter(x => x.show).length;
	}

	/**
	 * Toggles the grid filter
	 */
	protected toggleFilter(): void {
		this.showFilters = !this.showFilters;
	}

	/**
	 * Gets the number of grid filters
	 */
	protected filterCount(): number {
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
	protected hasFilterApplied(): boolean {
		return this.filterCount() > 0;
	}

	/**
	 * Emits a cell click event
	 * @param cellClickEvent
	 */
	protected onCellClick(cellClickEvent: CellClickEvent): void {
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
	protected onHeaderClick(event: any): void {
		if (event.target && event.target.parentNode) {
			event.target.parentNode.click();
		}
	}
}
