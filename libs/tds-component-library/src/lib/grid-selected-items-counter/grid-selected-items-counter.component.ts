import { Component, Input } from '@angular/core';

@Component({
	selector: 'tds-grid-selected-items-counter',
	templateUrl: './grid-selected-items-counter.component.html',
	styleUrls: ['./grid-selected-items-counter.component.scss']
})
export class GridSelectedItemsCounterComponent {
	@Input() itemsSelected: number;
}
