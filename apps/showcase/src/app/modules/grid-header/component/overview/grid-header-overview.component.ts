import { Component, OnInit } from '@angular/core';
import { HeaderActionButtonData } from 'libs/tds-component-library/src';

@Component({
	selector: 'app-grid-header-overview',
	templateUrl: './grid-header-overview.component.html',
	styleUrls: ['./grid-header-overview.component.scss'],
})
export class GridHeaderOverviewComponent implements OnInit {
	public actionButtons: HeaderActionButtonData[];
	disableClearFilters: Function;

	constructor() {
		this.disableClearFilters = this.disabledClearFilterImpl.bind(this);
	}

	ngOnInit(): void {
		this.actionButtons = [
			{ icon: 'plus', title: 'create', disabled: false, show: true, onClick: this.createAlert },
			{ icon: 'info-circle', title: 'info', disabled: false, show: true, onClick: this.infoAlertAsync },
			{ icon: 'pencil', title: 'edit', disabled: false, show: true, onClick: this.editAlert },
			{ icon: 'times', title: 'close', disabled: false, show: false, onClick: this.editAlert },
		];
	}

	/**
	 * Function to check if clear filters should be disabled:
	 */
	disabledClearFilterImpl(): boolean {
		return false;
	}

	public createAlert = (): void => {
		alert('Create clicked. See the console for the logged event.');
	}

	public editAlert = (): void => {
		alert('Edit clicked.');
	}

	public infoAlertAsync = async (): Promise<void> => {
		await new Promise(res => setTimeout(res, 2000));
		alert('Info clicked. This was an async function and resolved after two seconds.');
	}
}
