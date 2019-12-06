// TODO: This is largely copied from the existing TDS app. We should go through it and refactor.

import {
	GridDataResult,
	RowArgs,
	SelectableSettings,
	PageChangeEvent,
	CellClickEvent,
} from '@progress/kendo-angular-grid';
import { State, SortDescriptor, DataResult, CompositeFilterDescriptor, process } from '@progress/kendo-data-query';
import { ColumnHeaderData, FilterType, GridSettings } from '../models/grid-models';

export class DataGridHelper {
	// private notifier: NotifierService;

	constructor(result: any, gridSettings?: GridSettings) {
		// this.notifier = new NotifierService();
		this.state.sort = gridSettings.defaultSort;
		if (gridSettings.pageSize) {
			this.state.take = gridSettings.pageSize;
		}
		this.resultSet = result;
		if (gridSettings.selectableSettings) {
			this.selectableSettings = gridSettings.selectableSettings;
		}
		if (gridSettings.checkboxSelectionConfig) {
			for (const item of result) {
				this.bulkItems[item[gridSettings.checkboxSelectionConfig.useColumn]] = false;
			}
			this.checkboxSelectionConfig = gridSettings.checkboxSelectionConfig;
		}
		if (gridSettings.defaultPageOptions) {
			this.defaultPageOptions = gridSettings.defaultPageOptions;
		}
		this.loadPageData();
	}
	public gridData: GridDataResult = {
		data: [],
		total: 0,
	};
	public resultSet: Array<any>;
	public state: State = {
		filter: {
			filters: [],
			logic: 'and',
		},
		skip: 0,
		take: 25,
	};
	public selectedRows = [];
	public bulkItems: any = {};
	public selectAllCheckboxes = false;
	private selectableSettings: SelectableSettings;
	private checkboxSelectionConfig: any;
	public defaultPageOptions = [25, 50, 100];
	private filterType = FilterType;
	DefaultBooleanFilterData = 'All';

	public isRowSelected = (e: RowArgs) => this.selectedRows.indexOf(e.index) >= 0;

	/**
	 * On Filter column event.
	 * @param column
	 */
	public onFilter(column: ColumnHeaderData, operator?: string): void {
		const root = this.getFilter(column, operator);
		this.filterChange(root);
	}

	/**
	 * Get the filter for the column.
	 * @param column Column to be operated on
	 * @param operator Operator.
	 */
	public getFilter(column: ColumnHeaderData, operator?: string): CompositeFilterDescriptor {
		const root = this.state.filter || { logic: 'and', filters: [] };
		let [filter] = this.Flatten(root).filter((x: { field: string }) => x.field === column.property);
		if (!column.filter && column.filterType !== this.filterType.number && column.filter !== 0) {
			column.filter = '';
		}
		// check for number types and null value (clear out the filters)
		if (column.filterType === this.filterType.number && column.filter === null) {
			this.clearValue(column);
			return; // exit
		}
		if (column.filterType === this.filterType.number) {
			if (!filter) {
				root.filters.push({
					field: column.property,
					operator: operator ? operator : 'eq',
					value: Number(column.filter),
				});
			} else {
				filter = root.filters.find(r => {
					return r['field'] === column.property;
				});
				filter.value = Number(column.filter);
			}
		}
		if (column.filterType === this.filterType.text) {
			if (!filter) {
				root.filters.push({
					field: column.property,
					operator: 'contains',
					value: column.filter,
					ignoreCase: true,
				});
			} else {
				filter = root.filters.find(r => {
					return r['field'] === column.property;
				});
				filter.value = column.filter;
			}
		}
		if (column.filterType === this.filterType.date) {
			const { init, end } = this.getInitEndFromDate(column.filter);
			if (filter) {
				this.state.filter.filters = this.getFiltersExcluding(column.property);
			}
			root.filters.push({ field: column.property, operator: 'gte', value: init });
			root.filters.push({ field: column.property, operator: 'lte', value: end });
		}
		if (column.filterType === this.filterType.boolean) {
			if (!filter) {
				root.filters.push({
					field: column.property,
					operator: 'eq',
					value: column.filter === 'True' || column.filter === true,
				});
			} else {
				if (column.filter === this.DefaultBooleanFilterData) {
					this.clearValue(column);
				} else {
					filter = root.filters.find(r => {
						return r['field'] === column.property;
					});
					filter.value = column.filter === 'True' || column.filter === true;
				}
			}
		}
		if (column.filterType === this.filterType.dropdown) {
			if (!filter) {
				root.filters.push({
					field: column.property,
					operator: 'eq',
					value: column.filter,
					ignoreCase: true,
				});
			} else {
				filter = root.filters.find(r => {
					return r['field'] === column.property;
				});
				filter.value = column.filter;
			}
		}
		return root;
	}

	/**
	 * Check if a column has a filter.
	 * @param column column for filter check.
	 */

	public columnHasFilter(column: ColumnHeaderData): boolean {
		if (column.filterType === this.filterType.boolean) {
			return column.filter !== undefined;
		}
		return column.filter;
	}
	/**
	 * Update the filters state structure removing the column filter provided
	 * @param {ColumnHeaderData} column: Column to exclude from filters
	 * @param {any} state: Current filters state
	 * @returns void
	 */
	public clearFilter(column: ColumnHeaderData): void {
		if (column.filterType === this.filterType.dropdown) {
			column.filter = null;
		} else if (column.filterType === this.filterType.boolean) {
			column.filter = undefined;
		} else {
			column.filter = '';
		}
		this.state.filter.filters = this.getFiltersExcluding(column.property);
		this.filterChange(this.state.filter);
	}

	/**
	 * Clears all filters of all filterable columns.
	 * @param columns
	 */
	public clearAllFilters(columns: Array<ColumnHeaderData>): void {
		columns.forEach(column => {
			this.clearFilter(column);
		});
	}

	/**
	 * Get the filters state structure excluding the column filter name provided
	 * @param {string} excludeFilterName:  Name of the filter column to exclude
	 * @param {any} state: Current filters state
	 * @returns void
	 */
	private getFiltersExcluding(excludeFilterName: string): any {
		const filters = (this.state.filter && this.state.filter.filters) || [];
		return filters.filter(r => r['field'] !== excludeFilterName);
	}

	/**
	 * On Clear Value for filter event.
	 * @param column
	 */
	public clearValue(column: ColumnHeaderData): void {
		column.filter = '';
		if (this.state.filter && this.state.filter.filters.length > 0) {
			const filterIndex = this.state.filter.filters.findIndex((r: any) => r.field === column.property);
			this.state.filter.filters.splice(filterIndex, 1);
			this.filterChange(this.state.filter);
		}
	}

	/**
	 * On Filter Change.
	 * @param {CompositeFilterDescriptor} filter
	 */
	public filterChange(filter: CompositeFilterDescriptor): void {
		this.state.filter = filter;
		this.loadPageData();
	}

	/**
	 * Updates Sort.
	 * @param sort
	 */
	public sortChange(sort: SortDescriptor[]): void {
		this.state.sort = sort;
		this.loadPageData();
	}

	/**
	 * Catch the Selected Row
	 * @param {SelectionEvent} event
	 */
	public selectCell(event: CellClickEvent): void {
		if (event.columnIndex > 0) {
			this.selectedRows = [];
			if (this.selectableSettings.mode === 'single') {
				this.selectedRows.push(event.rowIndex);
			} else {
				this.selectedRows.push(event.rowIndex);
			}
		}
	}

	/**
	 * Toggle select all checkboxes.
	 */
	public onSelectAllCheckboxes(): void {
		const currentPageItems: DataResult = process(this.resultSet, this.state);
		currentPageItems.data.forEach(item => {
			// map-key-reference inception here
			this.bulkItems[item[this.checkboxSelectionConfig.useColumn]] = this.selectAllCheckboxes;
		});
	}

	/**
	 * Un selects all checkboxes.
	 */
	public unSelectAllCheckboxes(): void {
		Object.keys(this.bulkItems).forEach(key => {
			this.bulkItems[key] = false;
		});
		this.selectAllCheckboxes = false;
	}

	/**
	 * Get all checkboxes currently selected items.
	 * @returns {Array<any>}
	 */
	public getCheckboxSelectedItems(): Array<any> {
		return Object.keys(this.bulkItems).filter(key => this.bulkItems[key] === true);
	}

	/**
	 * Get all checkbox selected as an array of numbers
	 * @returns {Array<number>}
	 */
	public getCheckboxSelectedItemsAsNumbers(): Array<number> {
		return this.getCheckboxSelectedItems().map(item => parseInt(item, 10));
	}

	/**
	 * On checkbox change event.
	 * @param key
	 */
	public onCheckboxChange(key: any): void {
		if (!this.bulkItems[key]) {
			this.selectAllCheckboxes = false;
		}
	}

	/**
	 * Reloads data for current grid.
	 * @param result
	 */
	public reloadData(result: any): void {
		this.resultSet = result;
		this.loadPageData();
	}

	/**
	 * On Page change, pagination change.
	 * Manage Pagination
	 * @param {PageChangeEvent} event
	 */
	public pageChange(event: PageChangeEvent): void {
		this.state.skip = event.skip;
		this.state.take = event.take;
		if (this.checkboxSelectionConfig && this.checkboxSelectionConfig.useColumn) {
			// reset the select all checkbox to un-selected.
			this.selectAllCheckboxes = false;
			// If current page items all are checked then Select All box should be true, otherwise false.
			let allSelectedOnCurrentPage = true;
			const currentPageItems: DataResult = process(this.resultSet, this.state);
			currentPageItems.data.forEach(item => {
				// map-key-reference inception here
				if (!this.bulkItems[item[this.checkboxSelectionConfig.useColumn]]) {
					allSelectedOnCurrentPage = false;
					return;
				}
			});
			this.selectAllCheckboxes = allSelectedOnCurrentPage;
		}
		this.loadPageData();
	}

	/**
	 * Change the Model to the Page + Filter + Sort
	 */
	public loadPageData(): void {
		this.gridData = process(this.resultSet, this.state);
		// if filtered data is less than the current page set (skip) move to the first page.
		if (this.gridData.total < this.state.skip) {
			this.state.skip = 0;
			this.gridData = process(this.resultSet, this.state);
		}
		// this.notifyUpdateGridHeight();
	}

	/**
	 * Add one element to the list
	 * @param item
	 */
	public addDataItem(item: any): void {
		this.gridData.data.unshift(item);
	}

	/**
	 * Remove one element from to the list
	 * @param item
	 */
	public removeDataItem(item: any): void {
		const index = this.gridData.data.indexOf(item);
		if (index >= 0) {
			this.gridData.data.splice(index, 1);
			this.reloadData(this.gridData.data);
		}
	}

	/**
	 * Notify the event to update the grid height
	 */
	// public notifyUpdateGridHeight(): void {
	// 	this.notifier.broadcast({
	// 		name: 'grid.header.position.change',
	// 	});
	// 	// when dealing with locked columns Kendo grid fails to update the height, leaving a lot of empty space
	// 	jQuery('.k-grid-content-locked').addClass('element-height-100-per-i');
	// }

	/**
	 * Calculates and returns the current page number based on the current grid state & skip states.
	 */
	public getCurrentPage(): number {
		return this.state.skip / this.state.take + 1;
	}

	/**
	 * Calculates and returns the real row index based on the current pagination state.
	 */
	getRowPaginatedIndex(rowIndex: number): number {
		return rowIndex + (this.getCurrentPage() - 1) * this.getPageSize();
	}

	/**
	 * Returns grid take, since is the equivalent to page size number.
	 */
	public getPageSize(): number {
		return this.state.take;
	}

	/**
	 * Determine based upon the rows number if grid can positioned the menu column contextual menu dinamically
	 */
	public canSupportColumnMenuDynamic(minRows: number = 0): boolean {
		const minimum = minRows || 5;
		return (this.gridData && this.gridData.total) >= minimum;
	}

	Flatten = (filter: { filters: any }) => {
		const filters = filter.filters;
		if (filters) {
			return filters.reduce(
				(acc: { concat: (arg0: any) => void }, curr: { filters: any }) =>
					acc.concat(curr.filters ? this.Flatten(curr) : [curr]),
				[]
			);
		}
		return [];
	}

	/**
	 * Given a  date returns the beginning and end interval for that particular date
	 * @returns {init, end}
	 */
	public getInitEndFromDate(date: Date): { init: Date; end: Date } {
		const init = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

		return { init, end };
	}
}
