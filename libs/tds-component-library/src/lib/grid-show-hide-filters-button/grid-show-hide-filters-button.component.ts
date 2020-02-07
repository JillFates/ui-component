import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'tds-grid-show-hide-filters-button',
	templateUrl: './grid-show-hide-filters-button.component.html',
	styleUrls: ['./grid-show-hide-filters-button.component.scss']
})
export class GridShowHideFiltersButtonComponent {
	@Input() filterCount: number;
	@Output() toggleFilters: EventEmitter<void> = new EventEmitter<void>();

	/**
	 * Emits the toggle filters event
	 */
	onToggleFilters(): void {
		this.toggleFilters.emit();
	}
}
