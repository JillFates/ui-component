import { Component } from '@angular/core';
import * as gridData from '../grid-data';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

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

	public tasksPage: PageChangeEvent = {
		skip: 0,
		take: 5,
	};
	public tasksGrid: any = {
		pageable: {
			pageSizes: [5, 10, 25, 50, 100],
			info: true,
			type: 'input',
		},
		filterable: true,
		sortable: true,
		resizable: true,
		columnMenu: true,
	};

	public tasksData: GridDataResult;

	constructor() {
		this.loadTaskGrid();
	}

	/**
	 * pageChangeTaskGrid
	 */
	public pageChangeTaskGrid(event: PageChangeEvent): void {
		this.tasksPage = event;
		this.loadTaskGrid();
	}
	/**
	 * load Task Grid with data
	 */
	public loadTaskGrid(): void {
		this.tasksData = {
			data: this.dataTaskGrid.rows.slice(this.tasksPage.skip, this.tasksPage.skip + this.tasksPage.take),
			total: this.dataTaskGrid.rows.length,
		};
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

	/**
	 * changeTaskPage
	 *
	 * */
	public changeTaskPage(page: any): void {
		page = parseInt(page, 10);
		this.pageChangeTaskGrid({
			skip: (page - 1) * this.tasksPage.take,
			take: this.tasksPage.take,
		});
	}

	/**
	 * changeTaskTake
take:string	 */
	public changeTaskTake(take: number): void {
		this.pageChangeTaskGrid({
			skip: this.tasksPage.skip,
			take,
		});
	}
}
