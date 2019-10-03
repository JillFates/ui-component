import { Component } from '@angular/core';

@Component({
	selector: 'app-button-overview',
	templateUrl: './button-overview.component.html',
	styleUrls: ['./button-overview.component.scss'],
})
export class ButtonOverviewComponent {
	public buttonLoading: boolean;
	constructor() {
		//
		this.loadingClick();
	}

	/**
	 * Set Loading for 1 second
	 */
	public loadingClick(): void {
		console.log('Loading click');
		this.buttonLoading = true;
		setTimeout(() => {
			this.buttonLoading = false;
		}, 1000);
	}
}
