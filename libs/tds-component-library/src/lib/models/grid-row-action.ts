export interface GridRowAction {
	/**
	 * Name of the action
	 */
	name: string;
	/**
	 * Denotes if the action should be disabled.
	 */
	disabled: boolean;
	/**
	 * Denotes if the action should be shown.
	 */
	show: boolean;
	/**
	 * The function to be executed when the action item is clicked. All click events
	 * return the click event and the dataItem associated with the grid row.
	 */
	onClick(dataItem: any): Promise<void> | void;
}
