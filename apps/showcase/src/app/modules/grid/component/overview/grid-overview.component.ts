import {Component} from '@angular/core';

@Component({
	selector: 'app-grid-overview',
	templateUrl: './grid-overview.component.html',
	styleUrls: ['./grid-overview.component.scss']
})
export class GridOverviewComponent {
	public data: any = [
		{
			name: 'Jorge',
			role: 'FE Team'
		},
		{
			name: 'Cristian',
			role: 'QA Teams'
		},
		{
			name: 'Augusto',
			role: 'The chosen one'
		},
		{
			name: 'John',
			role: 'Papa Wheelie'
		}
	];
	constructor() {
		//
	}
}
