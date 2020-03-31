import { GridRowAction } from './grid-row-action';
import { HeaderActionButtonData } from './header-action-button-data';
import { SortDescriptor } from '@progress/kendo-data-query';
import { SelectableSettings, SortSettings } from '@progress/kendo-angular-grid';

export interface GridModel {
	/**
	 * Column model to be displayed in the grid.
	 */
	columnModel: ColumnHeaderData[];
	/**
	 * Actions to be displayed for each row in the grid.
	 */
	gridRowActions?: GridRowAction[];
	/**
	 * Settings for the grid.
	 */
	gridSettings?: GridSettings;
	/**
	 * Actions to be displayed in the grid header.
	 */
	headerActionButtons?: HeaderActionButtonData[];

	/**
	 * Function used to load the data to displayed in the grid.
	 * This function should return the data that will be used in
	 * the grid, and be parameterless.
	 */
	loadData(): any | Promise<any>;
}

export interface GridSettings {
	/**
	 *Page sizes for the grid. Defaults to [25, 50, 100]
	 */
	defaultPageOptions?: number[];
	/**
	 *The sort descriptor for the grid.
	 */
	defaultSort?: SortDescriptor[];
	/**
	 *The settings for the selection functionality of the Grid.
	 */
	selectableSettings?: SelectableSettings;
	/**
	 *TODO: Determine what this is used for and strongly type it.
	 *This has something to do with the bulk action capabilities of the grid.
	 */
	checkboxSelectionConfig?: any;
	/**
	 *Denotes whether the gridd is pageable. Defaults to false.
	 */
	pageable?: boolean;
	/**
	 *The initial page size of the grid. Defaults to 25.
	 */
	pageSize?: number;
	/**
	 *The sort settings for the grid.
	 */
	sortSettings?: SortSettings;
	/**
	 *Denotes if the grid is filterable. Defaults to false.
	 */
	filterable?: boolean;
	/**
	 *Denotes if the grid columns are resizable. Defaults to false.
	 */
	resizable?: boolean;
	/**
	 *Denotes the minimum width of a column in the grid.
	 */
	columnMinWidth?: number;
	/**
	 * Denotes the message shown while loading data.
	 */
	loadingMessage?: string;
}

export interface ColumnHeaderData {
	/**
	 * Label that will be displayed at the top of the column
	 */
	label: string;
	/**
	 * To keep the custom name and dont loose the property name original
	 */
	customPropertyName?: string;
	/**
	 * use this when it's a multi-level object accessor. i.e. [dataItem.currentValues.name]
	 */
	properties?: Array<string>;
	/**
	 * Property corresponding to the grid data.
	 */
	property: string;
	/**
	 * Type of filter that will be used to filter the column's data.
	 */
	filterType?: FilterType | 'text' | 'boolean' | 'date' | 'datetime' | 'dropdown';
	/**
	 * Type of column display.
	 */
	type?: 'text' | 'boolean' | 'date' | 'datetime';
	/**
	 * Optional format to be applied to the columns data before rendering.
	 */
	format?: string;
	/**
	 * Data that will be used/displayed as the filter. Example would be a dropdown list or boolean filter.
	 */
	filterInputData?: DropdownFilterData;
	/**
	 * Filter value applied to the column.
	 * Typically, this will not be set before passing this to the body.
	 * The component takes care of setting this value.
	 */
	filter?: any;
	/**
	 * Width of the column. Will default to a min width value passed to the grid if not defined.
	 */
	width?: number | string;
	/**
	 * Toggles the locked (frozen) state of the columns. Default to false.
	 */
	locked?: boolean;
	/**
	 * Enable/Disable columnMenu for column.
	 */
	columnMenu?: boolean;
	/**
	 * Enable/Disable filtering for column.
	 */
	filterable?: boolean;
	resizable?: boolean;
	headerStyle?: any;
	headerClass?: string | Array<string>;
	cellStyle?: any;
	cellClass?: string | Array<string>;
	sort?: 'asc' | 'desc';
	dropdownData?: Array<{text: string, value: any}>;
}

/**
 * Types of filters that can be used to filter columns.
 */
export enum FilterType {
	text = 'TEXT',
	number = 'NUMBER',
	boolean = 'BOOLEAN',
	date = 'DATE',
	datetime = 'DATETIME',
	dropdown = 'DROPDOWN',
	tag = 'TAG',
}

/**
 * Filter data that must be passed in the filterInputData property when using a dropdown filter.
 */
export interface DropdownFilterData {
	/**
	 * Sets the data of the DropDownList. This should be an array of data.
	 */
	data: DropdownData[];
	/**
	 * Sets the text of the default empty item.
	 * The type of the defined value has to match the data type of the value in DropdownData.
	 */
	defaultItem: DropdownData;
}

export interface DropdownData {
	/**
	 * Text of the item to be displayed in the dropdown.
	 */
	text: string;
	/**
	 * Value coorisponding to the text of the item.
	 */
	value: string | number | boolean;
}
