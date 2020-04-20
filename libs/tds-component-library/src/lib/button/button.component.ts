import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { generateRandomID } from '../utils/utils';

@Component({
	selector: 'tds-button',
	styleUrls: ['./button.component.scss'],
	templateUrl: './button.component.html',
})
export class ButtonComponent implements OnChanges {
	private _state: string;
	public btnState: ClrLoadingState = ClrLoadingState.DEFAULT;
	public classNames = [];

	@Input() type: string;
	@Input() icon: string;
	@Input() iconClass: string;
	@Input() theme: string;
	@Input() small: boolean;
	@Input() inverse: boolean;
	@Input() outline: boolean;
	@Input() flat: boolean;
	@Input() disabled: boolean;
	@Input() title: string;
	@Input() id: string;
	@Input() tabindex: string;
	@Input() tooltipText: string;

	constructor() {
		if (!this.id) {
			this.id = generateRandomID(8);
		}
	}

	get state(): string {
		return this._state;
	}
	@Input()
	set state(state: string) {
		this._state = (state || 'default').toUpperCase();
		if (ClrLoadingState.hasOwnProperty(this._state)) {
			this.btnState = ClrLoadingState[this._state];
		} else {
			this.btnState = ClrLoadingState.DEFAULT;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		const classNames = [];
		if (this.theme) {
			classNames.push(`btn-${this.theme}`);
		}
		if (this.outline) {
			classNames.push(`btn-outline`);
		}
		if (this.flat) {
			classNames.push(`btn-link`);
		}
		if (this.small) {
			classNames.push(`btn-sm`);
		}
		if (this.inverse) {
			classNames.push(`btn-inverse`);
		}
		if (this.icon) {
			classNames.push(`has-icon`);
		}
		if (this._state) {
			classNames.push(`state-${this._state.toLowerCase()}`);
		}

		this.classNames = classNames;
	}
}
