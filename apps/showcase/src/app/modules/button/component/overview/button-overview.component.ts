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
	public submitCount = 0;
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
			title: 'Button Types',
			description: 'adding a type="submit" will allow the button to submit a form.',
			code: `
<form (ngSubmit)="formSubmitCounter()">
	<p>Form Submit Count: {{ submitCount }}</p>
	<p>Submit type: <tds-button type="submit">Submit</tds-button></p>
	<p>Button type: <tds-button>Button</tds-button></p>
</form>
`,
		},
		{
			title: 'Button Themes',
			description:
				'Available theme names: primary, warning, danger, success. Set the outline to true to use a theme in outline mode.',
			code: `
<tds-button theme="primary">Primary</tds-button>
<tds-button theme="warning">Warning</tds-button>
<tds-button theme="danger">Danger</tds-button>
<tds-button theme="success">Success</tds-button>

<tds-button>Default</tds-button>
<tds-button theme="warning" [outline]="true">Warning</tds-button>
<tds-button theme="danger" [outline]="true">Danger</tds-button>
<tds-button theme="success" [outline]="true">Success</tds-button>
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
			title: 'Button Flat',
			description: 'Flat Attribute true or false',
			code: `
<tds-button [flat]="true">Flat Button</tds-button>
<tds-button icon="cog" [flat]="true"></tds-button>
`,
		},
		{
			title: 'Dropdown Button',
			description: '',
			code: `
<clr-dropdown>
	<tds-button theme="primary" clrDropdownTrigger>
		Dropdown <clr-icon shape="angle down"></clr-icon>
	</tds-button>
	<clr-dropdown-menu clrPosition="bottom-left" *clrIfOpen>
		<div clrDropdownItem>Link 1</div>
		<div clrDropdownItem>Link 2</div>
	</clr-dropdown-menu>
</clr-dropdown>
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
		{
			title: 'Button Bar',
			description:
			'Add a wrapping element with a "btn-group" class to create a button bar. https://v2.clarity.design/button-group',
			code: `
<div class="btn-group btn-primary">
	<tds-button theme="primary">Button 1</tds-button>
	<tds-button theme="warning">Button 2</tds-button>
	<tds-button theme="danger">Button 2</tds-button>
	<tds-button theme="success">Button 3</tds-button>
</div>s
			`,
		},
		{
			title: 'Button bar dropdown',
			description: 'Clarity Dropdown in button bar',
			code: `
<div class="btn-group btn-primary">
	<tds-button icon="home">Normal Button</tds-button>
	<clr-dropdown>
		<tds-button icon="ellipsis-vertical" clrDropdownTrigger></tds-button>
		<clr-dropdown-menu clrPosition="bottom-right" *clrIfOpen>
			<div clrDropdownItem>Link 1</div>
			<div clrDropdownItem>Link 2</div>
		</clr-dropdown-menu>
	</clr-dropdown>
</div>
	`,
		},
		{
			title: 'State Changing',
			description:
				'Changing the buttons state attribute from "default" to "loading" or "success" ' +
				'will add a spinner or check icon animation to the button.',
			code: `
<tds-button state="loading">Loading</tds-button>
<tds-button state="success">Success</tds-button>
`,
		},
	];

	constructor() {
		//
		this.setLoading('loading');
	}

	/**
	 * Counts the number of submits
	 */
	public formSubmitCounter(): void {
		this.submitCount++;
		console.log(this.submitCount);
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
