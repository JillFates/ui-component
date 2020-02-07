import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
	selector: 'tds-grid-clear-all-filters-button',
	templateUrl: './grid-clear-all-filters-button.component.html',
	styleUrls: ['./grid-clear-all-filters-button.component.scss'],
})
export class GridClearAllFiltersButtonComponent {
	@Input() show: boolean;
	@Output() clearFilters: EventEmitter<void> = new EventEmitter<void>();

	/**
	 * Emit the event to trigger clear all filters.
	 */
	onClearFilters(): void {
		this.clearFilters.emit();
	}
}
