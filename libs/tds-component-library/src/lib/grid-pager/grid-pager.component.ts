import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
	selector: 'tds-grid-pager',
	templateUrl: './grid-pager.component.html',
	styleUrls: ['./grid-pager.component.scss'],
})
export class GridPagerComponent implements OnInit {
	@Input() total: number;
	@Input() totalPages: number;
	@Input() currentPage: number;
	@Input() pageSize: number;
	@Input() pageSizes: number[];
	@Output() pageChange = new EventEmitter<PageChangeEvent>();

	public page: PageChangeEvent = {
		skip: 0,
		take: 5,
	};

	ngOnInit(): void {
		this.page.take = this.pageSize || this.page.take;
	}

	/**
	 * changePage
	 *
	 * */
	public changePage(page: any): void {
		page = parseInt(page, 10);
		this.page = {
			skip: (page - 1) * this.page.take,
			take: this.page.take,
		};
		this.pageChange.emit(this.page);
	}

	/**
	 * changeTake
	 */
	public changeTake(take: any): void {
		take = parseInt(take, 10);
		this.page = {
			skip: 0,
			take,
		};
		this.pageChange.emit(this.page);
	}
}
