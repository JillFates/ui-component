import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { HeaderActionButtonData } from '../models/header-action-button-data';

@Component({
	selector: 'tds-grid-header-action-buttons',
	templateUrl: './grid-header-action-buttons.component.html',
	styleUrls: ['./grid-header-action-buttons.component.scss'],
})
export class GridHeaderActionButtonsComponent implements OnInit {
	@Input() actionButtons: HeaderActionButtonData[];
	@Input() disableClearFilters: () => boolean;
	@Input() hasClearAllFilters = true;
	@Output() clearFilters: EventEmitter<void> = new EventEmitter<void>();
	@Output() refresh: EventEmitter<void> = new EventEmitter<void>();

	constructor() {
		//
	}

	public ngOnInit(): void {

		// This set of buttons should be present all over the grids
		const defaultButtons: HeaderActionButtonData[] = [];

		if (this.hasClearAllFilters) {
			defaultButtons.push(
				{
					icon: 'times',
					title: 'Clear filters' ,
					disabled: this.disableClearFilters  || false,
					show: true,
					onClick: this.onClearFilters.bind(this),
				}
			);
		}

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
	 * Emit the event to clear the data grid filters
	 */
	private onClearFilters(): void {
		this.clearFilters.emit();
	}

	/**
	 * Checks to see if a variable is a function
	 * @param variableToCheck
	 */
	public isFunction(variableToCheck: any): boolean {
		return variableToCheck instanceof Function;
	}
}
