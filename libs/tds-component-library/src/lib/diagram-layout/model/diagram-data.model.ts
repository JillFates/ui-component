export interface IDiagramData {
	nodeDataArray: any;
	linkDataArray: ILinkData[];
}

export interface ILinkData {
	from: string | number;
	to: string | number;
}
