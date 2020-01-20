import {Node, Link, Layout, EnumValue, DiagramEventName} from 'gojs';

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
	rootNode?: number | string;
	extras?: any;
	events?: IDiagramEvent[];
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

export interface IDiagramEvent {
	name: DiagramEventName;
	handler: () => void;
}
