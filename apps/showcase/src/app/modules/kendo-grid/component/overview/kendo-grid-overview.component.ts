import { Component } from '@angular/core';
import * as gridData from '../grid-data';

@Component({
	selector: 'app-kendo-grid-overview',
	templateUrl: './kendo-grid-overview.component.html',
	styleUrls: ['./kendo-grid-overview.component.scss'],
})
export class KendoGridOverviewComponent {
	public columnMenu = gridData.columnMenu;
	public columnModelTaskGrid = gridData.columnModelTaskGrid;
	public columnModelAssetsGrid = gridData.columnModelAssetsGrid;
	public dataTaskGrid = gridData.dataTaskGrid;
	public dataAssetsGrid = gridData.dataAssetsGrid;

	public selectedRows = 0;
	public showTasksFilter = false;
	public showAssetsFilter = false;
	/**
	 * Clear filters
	 */
	public onClearFilter(column: any): void {
		column.filter = null;
		console.log('On click filter');
	}

	/**
	 * Determines if the grid has filters applied
	 */
	public hasFilterApplied(name: string): boolean {
		return this.filterCount(name) > 0;
	}

	/**
	 * filterCount
	 */
	public filterCount(name: string): number {
		return this[name].filter((c: any) => c.filter).length;
	}

	/**
	 * Clear the grid filters
	 */
	public onClearFilters(name: string): void {
		this[name].forEach((c: any) => {
			c.filter = '';
		});
	}

	/**
	 *  Mark a row as selected
	 * @param dataItem
	 * @param value
	 */
	public selectRow(dataItem: any, value: boolean): void {
		dataItem.checked = value;
		this.selectedRows = this.dataAssetsGrid.rows.filter((item: any) => item.checked).length;
	}

	/**
	 * Filter Toggle
	 */
	public toggleTasksFilter(): void {
		this.showTasksFilter = !this.showTasksFilter;
	}

	/**
	 * Filter Toggle
	 */
	public toggleAssetsFilter(): void {
		this.showAssetsFilter = !this.showAssetsFilter;
	}

	/**
	 * Toggle all selections & set selected rows count
	 */
	public toggleAssetsChecks(checked: boolean): void {
		this.selectedRows = this.dataAssetsGrid.rows.reduce((count: number, item: any) => {
			item.checked = checked;
			if (checked) {
				count++;
			}
			return count;
		}, 0);
	}
}
