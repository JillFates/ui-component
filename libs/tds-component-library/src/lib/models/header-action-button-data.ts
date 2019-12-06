export interface HeaderActionButtonData {
	/**
	 * Clarity Icon to be shown in button
	 */
	icon: string;
	/**
	 * Title to be shown on hover
	 */
	title: string;
	/**
	 * Denotes if button should be disabled.
	 */
	disabled: boolean;
	/**
	 * Denotes if the button should be shown
	 */
	show: boolean;
	/**
	 * Function to be bound to the button's click event.
	 */
	onClick(): any | Promise<any> | void | Promise<void>;
}
