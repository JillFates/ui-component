import { Component } from '@angular/core';
interface CodeExample {
	title: string;
	description: string;
	code: string;
}

@Component({
	selector: 'app-button-overview',
	templateUrl: './button-overview.component.html',
	styleUrls: ['./button-overview.component.scss'],
})
export class ButtonOverviewComponent {
	public loadingButton: string;
	public successButton: string;
	public loadingSuccessButton: string;
	private examples: CodeExample[] = [
		{
			title: 'Default Button',
			description: '',
			code: `<tds-button>Submit</tds-button>`,
		},
		{
			title: 'Button Themes',
			description: 'Available theme names: primary, warning, success',
			code: `
<tds-button theme="primary">Submit</tds-button>
<tds-button theme="warning">Delete</tds-button>
<tds-button theme="success">OK</tds-button>
`,
		},
		{
			title: 'Button Sizes',
			description: 'Small Attribute true or false',
			code: `
<tds-button [small]="true">Small</tds-button>
<tds-button [small]="false">Normal</tds-button>
`,
		},
		{
			title: 'Button Icons',
			description: 'Buttons impliment Clarity Icons with the Icon Attribute. https://clarity.design/icons',
			code: `
<tds-button icon="cog">With Text</tds-button>
<tds-button icon="cog"></tds-button>
`,
		},
	];

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
