import { Component } from '@angular/core';

@Component({
	selector: 'app-button-overview',
	templateUrl: './button-overview.component.html',
	styleUrls: ['./button-overview.component.scss'],
})
export class ButtonOverviewComponent {
	public loadingButton: string;
	public successButton: string;
	public loadingSuccessButton: string;

	constructor() {
		//
		this.setLoading('loading');
	}

	/**
	 * Set Loading for 1 second
	 */
	public setLoading(buttonName: string): void {
		this[buttonName + 'Button'] = 'loading';
		setTimeout(() => {
			this[buttonName + 'Button'] = null;
		}, 1000);
	}

	/**
	 * Set Success for 1 second
	 */
	public setSuccess(buttonName: string): void {
		this[buttonName + 'Button'] = 'success';
		setTimeout(() => {
			this[buttonName + 'Button'] = null;
		}, 1000);
	}

	/**
	 * Set Loading for 1 second then set Success for 1 second
	 */
	public setLoadSuccess(): void {
		this.setLoading('loadingSuccess');
		setTimeout(() => this.setSuccess('loadingSuccess'), 1000);
	}
}
