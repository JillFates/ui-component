import { Component, Input } from '@angular/core';

@Component({
	selector: 'tds-button',
	styleUrls: ['./button.component.scss'],
	templateUrl: './button.component.html',
})
export class ButtonComponent {
	@Input() label: string;
	@Input() theme: string;
	@Input() disabled: boolean;
}
