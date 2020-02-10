import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { HeaderActionButtonData } from '../models/header-action-button-data';

@Component({
	selector: 'tds-grid-header-action-buttons',
	templateUrl: './grid-header-action-buttons.component.html',
	styleUrls: ['./grid-header-action-buttons.component.scss'],
})
export class GridHeaderActionButtonsComponent implements OnInit {
	@Input() actionButtons: HeaderActionButtonData[];
	@Output() refresh: EventEmitter<void> = new EventEmitter<void>();

	constructor() {
		//
	}

	public ngOnInit(): void {

		// This set of buttons should be present all over the grids
		const defaultButtons: HeaderActionButtonData[] = [];

		defaultButtons.push({
			icon: 'sync',
			iconClass: '',
			title: 'Refresh' ,
			show: true,
			onClick: this.onRefresh.bind(this),
		});

		// add the default buttons to the buttons provided as input parameters
		this.actionButtons = this.actionButtons.concat(defaultButtons);
	}

	/**
	 * Emit the event to refresh the data grid
	 */
	private onRefresh(): void {
		this.refresh.emit();
	}

	/**
	 * Checks to see if a variable is a function
	 * @param variableToCheck
	 */
	public isFunction(variableToCheck: any): boolean {
		return variableToCheck instanceof Function;
	}
}
