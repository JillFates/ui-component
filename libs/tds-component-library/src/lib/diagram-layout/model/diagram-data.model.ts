import { Node, Link } from 'gojs';

export interface IDiagramData {
	nodeDataArray: any;
	linkDataArray: ILinkData[];
	currentUserId: string | number;
	ctxMenuOptions: any;
	nodeTemplate: Node;
	linkTemplate: Link;
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
