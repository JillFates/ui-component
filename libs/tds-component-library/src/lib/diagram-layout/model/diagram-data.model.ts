import {Node, Link, Layout, EnumValue} from 'gojs';

export interface IDiagramData {
	nodeDataArray?: any;
	linkDataArray?: ILinkData[];
	currentUserId?: string | number;
	ctxMenuOptions?: any;
	nodeTemplate?: Node;
	linkTemplate?: Link;
	layout?: Layout;
	lowScaleTemplate?: Node;
	mediumScaleTemplate?: Node;
	rootAsset?: number | string;
	extras?: any;
}

export interface ILinkData {
	from: string | number;
	to: string | number;
}

export interface IconModel {
	[key: string]: {
		iconAlt?: string;
		icon?: string;
		color?: string;
		background?: string;
	};
}
