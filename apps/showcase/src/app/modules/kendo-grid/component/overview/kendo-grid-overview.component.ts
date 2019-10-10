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
	public hasFilterApplied(): boolean {
		return this.columnModelAssetsGrid.filter((c: any) => c.filter).length > 0;
	}

	/**
	 * Clear the grid filters
	 */
	public onClearFilters(): void {
		this.columnModelAssetsGrid.forEach((c: any) => {
			c.filter = '';
		});
	}

	/**
	 * Get the current grid rows selected
	 */
	public selectedRows(): number {
		return this.dataAssetsGrid.rows.filter((item: any) => item.checked).length;
	}

	/**
	 *  Mark a row as selected
	 * @param dataItem
	 * @param value
	 */
	public selectRow(dataItem: any, value: boolean): void {
		dataItem.checked = value;
	}
}
