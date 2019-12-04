import { Component } from '@angular/core';
import { HeaderActionButtonData } from 'libs/tds-component-library/src';

@Component({
	selector: 'app-grid-header-overview',
	templateUrl: './grid-header-overview.component.html',
	styleUrls: ['./grid-header-overview.component.scss'],
})
export class GridHeaderOverviewComponent {
	protected actionButtons: HeaderActionButtonData[] = [
		{ icon: 'plus', title: 'create', disabled: false, show: true, onClick: this.createAlert },
		{ icon: 'info-circle', title: 'info', disabled: false, show: true, onClick: this.infoAlertAsync },
		{ icon: 'pencil', title: 'edit', disabled: false, show: true, onClick: this.editAlert },
		{ icon: 'times', title: 'close', disabled: false, show: false, onClick: this.editAlert },
	];

	constructor() {
		//
	}

	/**
	 * Creates an alert when clicked
	 * @param event - on click event
	 */
	private createAlert(event: Event): void {
		console.log(event);
		event.stopPropagation();
		alert('Create clicked. See the console for the logged event.');
	}

	/**
	 * Creates an alert when clicked
	 */
	private editAlert(): void {
		alert('Edit clicked.');
	}

	/**
	 * Creates an alert when clicked
	 */
	private async infoAlertAsync(): Promise<void> {
		await new Promise(res => setTimeout(res, 2000));
		alert('Info clicked. This was an async function and resolved after two seconds.');
	}
}
