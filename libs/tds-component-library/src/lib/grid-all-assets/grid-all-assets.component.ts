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
}
