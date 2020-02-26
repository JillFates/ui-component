export interface ITooltipData {
	headerText?: string;
	headerBackgroundColor?: string;
	headerTextColor?: string;
	data?: {
		label?: string;
		value?: string;
		icon?: {name?: string, color?: string, background?: string};
	}[];
}
