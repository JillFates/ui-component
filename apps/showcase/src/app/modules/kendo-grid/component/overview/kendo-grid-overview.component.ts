import { Component } from '@angular/core';
import * as gridData from '../grid-data';

@Component({
	selector: 'app-kendo-grid-overview',
	templateUrl: './kendo-grid-overview.component.html',
	styleUrls: ['./kendo-grid-overview.component.scss'],
})
export class KendoGridOverviewComponent {
	public columnMenu = gridData.columnMenu;
	public columnModelAssetsGrid = gridData.columnModelAssetsGrid;
	public columnModelTaskGrid = gridData.columnModelTaskGrid;
	public dataAssetsGrid = gridData.dataAssetsGrid;
	public dataTaskGrid = gridData.dataTaskGrid;

	public selectedRows = 0;
	public showDetailsFilter = false;
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
	public toggleDetailsFilter(): void {
		this.showDetailsFilter = !this.showDetailsFilter;
	}
}
