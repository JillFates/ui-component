import { Component, Input } from '@angular/core';
import { HeaderActionButtonData } from '../models/header-action-button-data';

@Component({
	selector: 'tds-grid-header-action-buttons',
	templateUrl: './grid-header-action-buttons.component.html',
	styleUrls: ['./grid-header-action-buttons.component.scss'],
})
export class GridHeaderActionButtonsComponent {
	@Input() actionButtons: HeaderActionButtonData[];

	constructor() {
		//
	}
}
