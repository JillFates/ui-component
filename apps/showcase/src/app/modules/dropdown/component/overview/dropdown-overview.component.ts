import {Component} from '@angular/core';

@Component({
	selector: 'app-dropdown-overview',
	templateUrl: './dropdown-overview.component.html',
	styleUrls: ['./dropdown-overview.component.scss']
})
export class DropdownOverviewComponent {
	public data: any = [
		{
			name: 'Jorge',
			role: 'FE Team'
		},
		{
			name: 'Cristian',
			role: 'QA Team'
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
