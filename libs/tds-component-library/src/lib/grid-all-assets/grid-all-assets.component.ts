import {Component, Input} from '@angular/core';

@Component({
	selector:  'cv-grid-all-assets',
	templateUrl:  './grid-all-assets.component.html',
	styleUrls:  ['./grid-all-assets.component.scss']
})
export class GridAllAssetsComponent {
	@Input() data: any;
	@Input() columnModel: any;
	@Input() columnMenu: any;

	constructor() {
		//
	}

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
		return this.columnModel.filter((c: any) => c.filter).length > 0;
	}

	/**
	 * Clear the grid filters
	 */
	public onClearFilters(): void {
		this.columnModel.forEach((c: any) => {
			c.filter = '';
		});
	}

	/**
	 * Get the current grid rows selected
	 */
	public selectedRows(): number {
		return this.data.rows
			.filter((item: any) => item.checked).length;
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
