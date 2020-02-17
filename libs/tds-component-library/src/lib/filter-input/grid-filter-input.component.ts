/**
 * Control to encapsulate the behaviour associated to filtering elements
 * It has an input where the user can type the search text and a clear icon button to clear the search entered
 * The intention is while the user is typing, disabling angular change detection events
 * just until the bounce time has expired or the user press the ENTER key.
 * The goal is to improve the performance of grids with a low of rows
 */
import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	NgZone,
	OnChanges,
	OnDestroy,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { BooleanFilterData, SEARCH_QUITE_PERIOD } from './model/constants';
import { KEYSTROKE } from '../models/constants';
import { ColumnHeaderData, FilterType } from '../models/grid-models';

@Component({
	selector: 'tds-grid-filter-input',
	templateUrl: './grid-filter-input.component.html',
	styleUrls: ['./grid-filter-input.component.scss']
})
export class GridFilterInputComponent implements AfterViewInit, OnDestroy, OnChanges {
	@Input() name = '';
	@Input() dropdownData: Array<any> = [];
	@Input() placeholder = '';
	@Input() value: String | Date | boolean = '';
	@Input() filterType: string;
	@Input() dateFormat = '';
	@Input() column: ColumnHeaderData | any;
	@Output() filter: EventEmitter<string | Date | boolean> = new EventEmitter<string | Date | boolean>();
	@ViewChild('filterInput', { read: ElementRef, static: false })
	filterInput: ElementRef;
	FilterType = FilterType;
	public booleanFilterData = BooleanFilterData;
	private previousSearch = '';
	private typingTimeout = null;
	private readonly NOT_ALLOWED_CHAR_REGEX = /ALT|ARROW|F+|ESC|TAB|SHIFT|CONTROL|PAGE|HOME|PRINT|END|CAPS|AUDIO|MEDIA/i;

	constructor(private zone: NgZone) {
	}

	ngAfterViewInit(): void {
		/* The handler to react on keyup event for the search input
	 	* is running outside of the angular zone in order to don't trigger
	 	* the angular change detection process on every key stroked
	 	*/
		if (this.isFilterInputAvailable()) {
			this.zone.runOutsideAngular(() => {
				this.filterInput.nativeElement.addEventListener(
					'keyup',
					this.keyPressedListener.bind(this)
				);
			});
		}
	}

	/**
	 * On input changes update the value of the input control
	 * @param {SimpleChanges} changes - Object with the input properties updated bye the host component
	 */
	ngOnChanges(changes: SimpleChanges): void {
		if (changes.value && !changes.value.firstChange
			&& (this.filterType === FilterType.dropdown || this.filterType === 'dropdown')) {
			if (!changes.value.currentValue) {
				this.value = null;
			}
		}
	}

	/**
	 * On destroying the component remove the event listener associated
	 */
	ngOnDestroy(): void {
		if (this.isFilterInputAvailable()) {
			this.filterInput.nativeElement.removeEventListener(
				'keyup',
				this.keyPressedListener.bind(this)
			);
		}
	}

	/**
	 * Clear the entered search string and notify to the host component
	 */
	public onClearFilter(): void {
		if (this.isFilterInputAvailable()) {
			this.filterInput.nativeElement.value = null;
		}
		this.previousSearch = '';
		this.onFilter(null);
	}

	/**
	 * Notify to the host component about a new search entered
	 * @param {string} search - Current search value
	 */
	public onFilter(search: string | Date | boolean): void {
		/* Here the search is done so the notification to the host component is made
			within the angular zone in order to update the UI
		*/
		this.zone.run(() => this.filter.emit(search));
	}

	/**
	 * Handle the onPaste event of the input-paste directive
	 * Notify to the host component about a new search, validate previousSearch is different
	 * from new one
	 * @param {string} search - Current search value
	 */
	public onPaste(search: string): void {
		if (this.isFilterInputAvailable()) {
			this.filterInput.nativeElement.value = search;
			if (this.preventFilterSearch(search)) {
				return; // prevent search
			}
			clearTimeout(this.typingTimeout);
			this.typingTimeout = setTimeout(
				() => this.onFilter(search),
				SEARCH_QUITE_PERIOD
			);
		}
	}

	/**
	 * Determines if the current filter is available
	 */
	private isFilterInputAvailable(): boolean {
		return !!this.filterInput;
	}

	/**
	 * Event handler to be attached to the listener input keypress event of the search input
	 * @param {KeyboardEvent} keyEvent - Key press event info
	 */
	private keyPressedListener(keyEvent: KeyboardEvent): void {
		if (this.isFilterInputAvailable()) {
			this.onFilterKeyUp(keyEvent, this.filterInput.nativeElement.value);
		}
	}

	/**
	 * If the previous search is the same to the current cancel the search
	 * Otherwise point the previous search to the new one search string
	 * @param {string} search - Current search value
	 * @return {boolean}  Boolean indicating if search is cancelled
	 */
	private preventFilterSearch(search: string): boolean {
		if (this.previousSearch === search) {
			return true;
		}
		this.previousSearch = search;
		return false;
	}

	/**
	 * Handle the input keypress events of the search input
	 * Notify to the host component about a new search only if the guards
	 * defined on preventFilterSearch and the bounce timeout are met
	 * it ignores the input of special characters
	 * @param {KeyboardEvent} keyEvent - Key press event info
	 * @param {string} search - Current search value
	 */
	private onFilterKeyUp(keyEvent: KeyboardEvent, search: string): void {
		if (this.isFilterInputAvailable()) {
			if (this.preventFilterSearch(search)) {
				return; // prevent search
			}
			if (keyEvent.code === KEYSTROKE.ENTER) {
				this.onFilter(search);
			} else if (!this.NOT_ALLOWED_CHAR_REGEX.test(keyEvent.code)) {
				clearTimeout(this.typingTimeout);
				this.typingTimeout = setTimeout(
					() => this.onFilter(search),
					SEARCH_QUITE_PERIOD
				);
			}
		}
	}
}
