import {Directive, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
	selector: '[tdsDoubleClick]'
})
export class DoubleClickDirective {
	@Output() doubleClick: EventEmitter<MouseEvent> = new EventEmitter();

	/**
	 * Listen for double click events, detecting one notify to the host component
	 * @param event MouseEvent info about where the double click mas made
	 */
	@HostListener('dblclick', ['$event']) handleDoubleClickEvent(event: MouseEvent): void {
		this.doubleClick.emit(event);
	}
}
