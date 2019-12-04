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
	 * The function to be executed when the action item is clicked.
	 */
	onClick: Function;
	/**
	 * The data item that will be returned on the click.
	 */
	dataItem: any;
}
