import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';

@Component({
	selector: 'tds-button',
	styleUrls: ['./button.component.scss'],
	templateUrl: './button.component.html',
})
export class ButtonComponent {
	private _loading: boolean;
	@Input() icon: string;
	@Input() theme: string;
	@Input() disabled: boolean;

	@Output() action: EventEmitter<any> = new EventEmitter();

	get loading(): boolean {
		return this._loading;
	}
	@Input()
	set loading(loading: boolean) {
		this._loading = loading;
	}

	/**
	 * Button Click Action
	 * @param e : Event
	 */
	public buttonAction(e: Event): void {
		console.log('button was clicked');
		this.action.next(e);
	}

	/**
	 * Get button theme class
	 * @return string : theme class
	 */
	public buttonTheme(): string {
		return (this.theme && `btn-${this.theme}`) || '';
	}

	// private loadingBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
}
