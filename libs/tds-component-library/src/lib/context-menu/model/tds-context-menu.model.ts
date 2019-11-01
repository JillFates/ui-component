export interface ITdsContextMenuModel {
	selectedNode?: any;
	currentUser?: any;
	mousePt?: {x: string, y: string};
	options?: ITdsContextMenuOption;
}

export interface ITdsContextMenuOption {
	containerComp?: string;
	fields: ITdsContextMenuField[];
}

export interface ITdsContextMenuField {
	label?: string;
	event?: string;
	icon?: ITdsContextMenuIcon;
	status?: string;
	isAvailable?: (n: any) => boolean;
	hasPermission?: () => boolean;
}

export interface ITdsContextMenuIcon {
	name?: string;
	iconAlt?: string;
	icon?: any;
	color?: string;
}
