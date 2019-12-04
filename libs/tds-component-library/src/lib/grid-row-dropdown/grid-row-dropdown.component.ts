import { Component, Input } from '@angular/core';
import { GridRowAction } from '../models/grid-row-action';

@Component({
	selector: 'tds-grid-row-dropdown',
	templateUrl: './grid-row-dropdown.component.html',
	styleUrls: ['./grid-row-dropdown.component.scss'],
})
export class GridRowDropdownComponent {
	@Input() gridRowActions: GridRowAction[];
	constructor() {
		//
	}
}
