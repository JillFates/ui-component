import {Component, Input} from '@angular/core';

@Component({
	selector:  'tds-grid',
	templateUrl:  './grid.component.html',
	styleUrls:  ['./grid.component.scss']
})
export class GridComponent {
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
}
