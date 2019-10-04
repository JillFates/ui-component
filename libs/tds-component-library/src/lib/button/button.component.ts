import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';

@Component({
	selector: 'tds-button',
	styleUrls: ['./button.component.scss'],
	templateUrl: './button.component.html',
})
export class ButtonComponent {
	private _state: string;
	private _btnState: ClrLoadingState = ClrLoadingState.DEFAULT;
	public buttonText: string;

	@Input() icon: string;
	@Input() theme: string;
	@Input() small: boolean;
	@Input() block: boolean;
	@Input() inverse: boolean;
	@Input() outline: boolean;
	@Input() disabled: boolean;

	@Output() action: EventEmitter<any> = new EventEmitter();

	get state(): string {
		return this._state;
	}
	@Input()
	set state(state: string) {
		this._state = (state || 'default').toUpperCase();
		if (ClrLoadingState.hasOwnProperty(this._state)) {
			this._btnState = ClrLoadingState[this._state];
		} else {
			this._btnState = ClrLoadingState.DEFAULT;
		}
	}

	/**
	 * Button Click Action
	 * @param e : Event
	 */
	public buttonAction(e: Event): void {
		this.action.next(e);
	}

	/**
	 * Get button classes
	 * @return Array
	 */
	public buttonClass(): Array<string> {
		const classnames = [];
		if (this.theme) {
			switch (this.theme) {
				case 'info':
				case 'success':
				case 'danger':
					if (this.outline) {
						classnames.push(`btn-${this.theme}-outline`);
						break;
					}
					classnames.push(`btn-${this.theme}`);
					break;
				default:
					classnames.push(`btn-${this.theme}`);
			}
			classnames.push(`btn-${this.theme}`);
		}
		if (this.small) {
			classnames.push(`btn-sm`);
		}
		if (this.inverse) {
			classnames.push(`btn-inverse`);
		}
		if (this.icon) {
			classnames.push(`has-icon`);
		}

		return classnames;
	}
}
