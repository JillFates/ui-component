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

	public assetsPage: PageChangeEvent = {
		skip: 0,
		take: 5,
	};
	public assetsGrid: any = {
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
	public assetsData: GridDataResult;

	public counter = 1;
	public progress = 0;
	constructor() {
		this.loadTasksGrid();
		this.loadAssetsGrid();
	}

	/**
	 * pageChangeTaskGrid
	 */
	public pageChangeTaskGrid(event: PageChangeEvent): void {
		this.tasksPage = event;
		this.loadTasksGrid();
	}
	/**
	 * load Task Grid with data
	 */
	public loadTasksGrid(): void {
		const { skip, take } = this.tasksPage;
		this.tasksData = {
			data: this.dataTaskGrid.rows.slice(skip, skip + take),
			total: this.dataTaskGrid.rows.length,
		};

		console.log(this.tasksData.data);
	}

	/**
	 * pageChangeAssetsGrid
	 */
	public pageChangeAssetGrid(event: PageChangeEvent): void {
		this.assetsPage = event;
		this.loadAssetsGrid();
	}
	/**
	 * load Assets Grid with data
	 */
	public loadAssetsGrid(): void {
		const { skip, take } = this.assetsPage;
		this.assetsData = {
			data: this.dataAssetsGrid.rows.slice(skip, skip + take),
			total: this.dataAssetsGrid.rows.length,
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
	 * Filter Tasks Toggle
	 */
	public toggleTasksFilter(): void {
		this.showTasksFilter = !this.showTasksFilter;
	}

	/**
	 * Filter Assets Toggle
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
	 */
	public changeTaskTake(take: any): void {
		take = parseInt(take, 10);
		this.pageChangeTaskGrid({
			skip: 0,
			take,
		});
	}

	/**
	 * changeAssetPage
	 *
	 * */
	public changeAssetPage(page: any): void {
		page = parseInt(page, 10);
		this.pageChangeAssetGrid({
			skip: (page - 1) * this.assetsPage.take,
			take: this.assetsPage.take,
		});
	}

	/**
	 * changeAssetTake
	 */
	public changeAssetTake(take: any): void {
		take = parseInt(take, 10);
		this.pageChangeAssetGrid({
			skip: 0,
			take: take,
		});
	}
}
