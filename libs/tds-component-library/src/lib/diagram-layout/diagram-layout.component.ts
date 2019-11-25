import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter, HostListener,
	Input,
	OnChanges, OnDestroy,
	Output,
	Renderer2,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import {IDiagramData, IconModel, ILinkData} from './model/diagram-data.model';
import {
	Node,
	Binding,
	CircularLayout,
	Diagram,
	GraphLinksModel,
	Layout,
	Link,
	Margin,
	Panel,
	Shape,
	TextBlock,
	InputEvent,
	Adornment,
	Placeholder,
	Overview,
	Spot,
	Tool,
	GraphObject,
	HTMLInfo,
	Size
} from 'gojs';
import {FA_ICONS} from '../icons-constant/fontawesome-icons';
import {of, ReplaySubject} from 'rxjs';
import {DiagramEvent} from './model/diagram-event.constant';
import {TdsContextMenuComponent} from '../context-menu/tds-context-menu.component';
import {ITdsContextMenuModel, ITdsContextMenuOption} from '../context-menu/model/tds-context-menu.model';
import {ITooltipData} from './model/tooltip-data.model';

const enum NodeTemplateEnum {
	HIGH_SCALE,
	MEDIUM_SCALE,
	LOW_SCALE
}

@Component({
	selector: 'tds-lib-diagram-layout',
	templateUrl: './diagram-layout.component.html',
	styleUrls: ['./diagram-layout.component.scss'],
})
export class DiagramLayoutComponent implements OnChanges, AfterViewInit, OnDestroy {
	@Input() data: IDiagramData;
	@Input() layout: Layout;
	@Input() nodeTemplate: Node;
	@Input() linkTemplate: Link;
	@Input() lowScaleTemplate: Node;
	@Input() mediumScaleTemplate: Node;
	@Input() selectionTemplate: Adornment;
	@Input() icons: IconModel;
	@Input() currentUser: any;
	@Input() contextMenuOptions: ITdsContextMenuOption;
	@Input() hideOverview = false;
	@Input() hideExpand = true;
	@Input() hideControlButtons = false;
	@Input() extras: any;
	@Output() nodeUpdated: EventEmitter<any> = new EventEmitter<any>();
	@Output() nodeClicked: EventEmitter<any> = new EventEmitter<any>();
	@Output() backToFullGraph: EventEmitter<void> = new EventEmitter<void>();
	@Output() diagramAnimationFinished: EventEmitter<void> = new EventEmitter<void>();
	@Output() ctxMenuActionDispatched: EventEmitter<string> = new EventEmitter<string>();
	@Output() expandActionDispatched: EventEmitter<void> = new EventEmitter<void>();
	@ViewChild('diagramContainer', {static: false}) diagramContainer: ElementRef;
	@ViewChild('tdsCtxMenu', {static: false}) tdsCtxMenu: TdsContextMenuComponent;
	@ViewChild('overviewContainer', {static: false}) overviewContainer: ElementRef;
	@ViewChild('nodeTooltip', {static: false}) nodeTooltip: ElementRef;
	model: GraphLinksModel;
	diagram: Diagram = new Diagram();
	faIcons = FA_ICONS;
	resetOvIndex: boolean;
	tooltipData: ITooltipData;
	largeArrayRemaining: boolean;
	DATA_CHUNKS_SIZE = 200;
	remainingData: any;
	remainingLinks: any;
	diagramOverview: Overview;
	diagramAvailable = false;
	actualNodeTemplate: number;
	nodeMove: boolean;
	unsubscribe$: ReplaySubject<void> = new ReplaySubject();
	showFullGraphBtn: boolean;
	ctxMenuData$: ReplaySubject<ITdsContextMenuModel> = new ReplaySubject();

	constructor(private renderer: Renderer2) {
		// Constructor
	}

	/**
	 * Detect changes to update nodeData and linksPath accordingly
	 **/
	ngOnChanges(changes: SimpleChanges): void {
		if (changes) {
			if (changes.data && !changes.data.firstChange) {
				this.loadAll();
			} else if (changes.layout || changes.nodeTemplate || changes.linkTemplate) {
				this.generateDiagram();
			}
		}
	}

	/**
	 * AfterViewInit hook
	 **/
	ngAfterViewInit(): void {
		if (this.data) {
			this.loadAll();
		}
	}

	/**
	 * Load all data related to the diagram
	 **/
	loadAll(): void {
		this.loadModel();
		this.initialiseDiagram();
		this.generateDiagram();
	}

	/**
	 * Load data model used by the diagram
	 **/
	loadModel(): void {
		if (this.data.nodeDataArray.length < 600) {
			this.model = new GraphLinksModel(this.data.nodeDataArray, this.data.linkDataArray);
		} else {
			this.remainingData = this.data.nodeDataArray.slice();
			this.remainingLinks = this.data.linkDataArray.slice();
			this.model = new GraphLinksModel(
				this.remainingData.splice(0, this.DATA_CHUNKS_SIZE),
				this.remainingLinks.splice(0, this.DATA_CHUNKS_SIZE));
			this.largeArrayRemaining = true;
		}
	}

	/**
	 * Handler for large array of nodes and links, this helps improve rendering times
	 */
	handleLargeDataArray(): void {
		this.diagram.removeDiagramListener(DiagramEvent.ANIMATION_FINISHED, null);
		const dataCopy = this.data.nodeDataArray.slice();
		const linksCopy = this.data.linkDataArray.slice();
		const dataChunks = [];
		const linkChunks = [];

		while (dataCopy.length > this.DATA_CHUNKS_SIZE) {
			dataChunks.push(dataCopy.splice(0, this.DATA_CHUNKS_SIZE));
		}
		dataChunks.push(dataCopy);

		while (linksCopy.length > this.DATA_CHUNKS_SIZE) {
			linkChunks.push(linksCopy.splice(0, this.DATA_CHUNKS_SIZE));
		}
		linkChunks.push(linksCopy);

		of(...dataChunks)
			.subscribe(chunk => this.addNewNodesToDiagram(chunk));

		of(...linkChunks)
			.subscribe(chunk => this.addNewLinksToDiagram(chunk));

		this.largeArrayRemaining = false;

	}

	/**
	 * Add nodes to diagram programmatically
	 * @param c
	 */
	addNewNodesToDiagram(c: any): void {
		this.diagram.commitTransaction('add node data');
		this.model.addNodeDataCollection(c);
		this.diagram.commitTransaction('added new node data');
	}

	/**
	 * Add links to diagram programmatically
	 * @param c
	 */
	addNewLinksToDiagram(c: any): void {
		this.diagram.commitTransaction('add link data');
		this.model.addLinkDataCollection(c);
		this.diagram.commitTransaction('added new link data');
	}

	/**
	 * set the element used as container to hold the diagram
	 **/
	initialiseDiagram(): void {
		this.diagram.div = this.diagramContainer.nativeElement;
	}

	/**
	 * Generate Diagram canvas
	 **/
	generateDiagram(): void {
		if (!this.model) { return; }
		this.diagram.model.nodeDataArray = [];
		this.diagram.commit(d => {
			d.initialDocumentSpot = Spot.Center;
			d.initialViewportSpot = Spot.Center;
			d.hasHorizontalScrollbar = false;
			d.hasVerticalScrollbar = false;
			d.allowZoom = true;
			d.zoomToFit();
			d.layout = this.setLayout();
			d.nodeTemplate = this.setNodeTemplate();
			d.linkTemplate = this.setLinkTemplate();
		});
		this.diagram.model = this.model;
		this.diagramAvailable = true;
		this.overrideMouseWheel();
		this.overviewTemplate();
		this.diagramListeners();
		this.diagramExtras();
	}

	/**
	 * additional diagram configurations
	 */
	diagramExtras(): void {
		if (this.extras) {
			this.diagram.commit(d => Object.keys(this.extras)
				.forEach((k, v) => {
					d[k] = v;
				})
			);
		}
	}

	/**
	 * Override mousewheel handler to add the zooming scales
	 **/
	overrideMouseWheel(): void {
		const tool = this.diagram.currentTool;
		tool.standardMouseWheel = () => {
			Tool.prototype.standardMouseWheel.call(tool);
			this.setNodeTemplateByScale(this.diagram.scale, this.diagram.lastInput);
		};
	}

	/**
	 * Diagram listeners to be used for custom functionality
	 */
	diagramListeners(): void {
		this.diagram.addDiagramListener(DiagramEvent.ANIMATION_FINISHED, () => {

			if (this.nodeMove) {
				this.nodeMove = false;
				this.diagramAnimationFinished.emit();
				this.showFullGraphBtn = true;
			}

			if (this.largeArrayRemaining) {
				this.diagram.animationManager.isEnabled = false;
				this.handleLargeDataArray();
				setTimeout(() => {
					this.diagram.animationManager.isEnabled = true;
					this.showFullGraphBtn = false;
				}, 1000);
			}

			this.diagram.commit(d => d.centerRect(d.findNodeForKey(this.data.rootAsset).actualBounds));
		});
		if (!this.largeArrayRemaining) {
			if (this.diagram.linkTemplate.routing !== Link.AvoidsNodes) { this.setLinkTemplate(); }
			if (!this.diagram.animationManager.isEnabled) { this.diagram.animationManager.isEnabled = true; }
		}

		this.diagram.addDiagramListener(DiagramEvent.BACKGROUND_SINGLE_CLICKED, () => {
			this.hideToolTip();
			this.diagram.toolManager.contextMenuTool.hideContextMenu();
		});
		this.diagram.addDiagramListener(DiagramEvent.BACKGROUND_DOUBLE_CLICKED, () => {
			this.hideToolTip();
			this.diagram.toolManager.contextMenuTool.hideContextMenu();
		});
		this.diagram.addDiagramListener(DiagramEvent.BACKGROUND_CONTEXT_CLICKED, () => {
			this.hideToolTip();
			this.diagram.toolManager.contextMenuTool.hideContextMenu();
		});
		this.diagram.addDiagramListener(DiagramEvent.OBJECT_SINGLE_CLICKED, () => {
			this.hideToolTip();
			this.diagram.toolManager.contextMenuTool.hideContextMenu();
		});
		this.diagram.addDiagramListener(DiagramEvent.OBJECT_DOUBLE_CLICKED, () => {
			this.hideToolTip();
			this.diagram.toolManager.contextMenuTool.hideContextMenu();
		});
		this.diagram.addDiagramListener(DiagramEvent.OBJECT_CONTEXT_CLICKED, () => {
			this.hideToolTip();
		});
	}

	/**
	 * Node click handler to set the adornments or any other operation on nodes when clicked
	 **/
	onNodeClick(inputEvent: InputEvent, obj: any): void {
		if (obj && obj.part && obj.part.data) {
			obj.selectionAdornmentTemplate = this.selectionAdornmentTemplate();
			this.nodeClicked.emit(obj.part.data);
			this.nodeMove = true;
		}
	}

	/**
	 * click handler to dispatch expand action
	 **/
	expandClicked(): void {
		this.expandActionDispatched.emit();
	}

	/**
	 * Diagram overview (Minimap)
	 **/
	overviewTemplate(): void {
		if (!this.diagramOverview && !this.hideOverview) {
			this.diagramOverview = new Overview(this.overviewContainer.nativeElement);
			this.diagramOverview.observed = this.diagram;
			this.diagramOverview.contentAlignment = Spot.Center;
		}
	}

	/**
	 * Node Adornment template configuration
	 * @param {Node} node > optional node to add the adornment to
	 **/
	selectionAdornmentTemplate(node?: Node): Adornment {
		if (this.selectionTemplate) { return this.selectionTemplate; }
		const selAdornmentTemplate = new Adornment(Panel.Auto);
		selAdornmentTemplate.selectionAdorned = true;
		if (node) { selAdornmentTemplate.adornedObject = node; }

		const selAdornmentShape = new Shape();
		selAdornmentShape.figure = 'RoundedRectangle';
		selAdornmentShape.fill = null;
		selAdornmentShape.stroke = 'red';
		selAdornmentShape.strokeWidth = 4;

		const placeholder = new Placeholder();

		// placeholder.background = 'transparent';
		// placeholder.visible = true;
		selAdornmentTemplate.add(selAdornmentShape);
		selAdornmentTemplate.add(placeholder);

		return selAdornmentTemplate;
	}

	/**
	 * Sets the template for each node in the Diagram
	 **/
	setNodeTemplate(): Node {
		if (this.data.nodeTemplate) {
			this.data.nodeTemplate.toolTip = this.createTooltip();
			this.data.nodeTemplate.contextMenu = this.contextMenu();
			return this.data.nodeTemplate;
		}
		if (this.nodeTemplate) {
			this.nodeTemplate.toolTip = this.createTooltip();
			this.nodeTemplate.contextMenu = this.contextMenu();
			return this.nodeTemplate;
		}

		if (this.diagram.scale < 0.6446089162177968) {
			this.setNodeTemplateByScale();
			return null;
		}
		const node = new Node(Panel.Horizontal);
		node.margin = new Margin(1, 1, 1, 1);

		const panel = new Panel(Panel.Auto);
		panel.background = '#fff';
		panel.padding = new Margin(0, 0, 0, 0);

		const nodeShape = new Shape();
		nodeShape.figure = 'RoundedRectangle';
		nodeShape.strokeWidth = 2;
		nodeShape.stroke = '#ddd';
		nodeShape.fill = 'white';

		const panelBody = new Panel(Panel.Horizontal);
		panel.padding = new Margin(0, 0, 0, 0);
		panel.margin = new Margin(0, 0, 0, 0);
		const textBlock = new TextBlock();
		textBlock.stroke = '#333';
		textBlock.bind(new Binding('text', 'name'));
		panelBody.add(textBlock);

		panel.add(nodeShape);
		panel.add(panelBody);

		node.add(panel);

		node.contextMenu = this.contextMenu();

		return node;
	}

	/**
	 * Sets the template for each node link in the Diagram
	 **/
	setLinkTemplate(): Link {
		if (this.data.linkTemplate) { return this.data.linkTemplate; }
		if (this.linkTemplate) { return this.linkTemplate; }
		const link = new Link();
		link.routing = Link.AvoidsNodes;
		link.corner = 5;
		const containerShape = new Shape();
		const arrowHead = new Shape();
		arrowHead.toArrow = 'Standard';
		link.add(containerShape);
		link.add(arrowHead);
		return link;
	}

	/**
	 * Sets the Layout to be used by the Diagram
	 **/
	setLayout(): Layout {
		if (this.data.layout) { return this.data.layout; }
		if (this.layout) { return this.layout; }
		const layout = new CircularLayout();
		layout.radius = 100;
		layout.spacing = 0;
		layout.nodeDiameterFormula = CircularLayout.Circular;
		layout.startAngle = 270;

		return layout;
	}

	/**
	 * update node on graph
	 **/
	updateNode(data: any): void {
		this.diagram.commit(d => {
			const update = Object.assign({}, data);
			if (!update.key) { update.key = data.id; }
			const node = d.nodes.filter(f => f.part.data.key === update.key).first();
			node.part.data = update;
			node.updateAdornments();
			this.nodeUpdated.
			emit({
				data: d.model.nodeDataArray,
				linksPath: this.extractLinks(d.links)
			});
		});
	}

	/**
	 * Extracts links with specified format
	 * @param links
	 */
	extractLinks(links: any): ILinkData[] {
		const linksPath = [];
		links.each((l: Link) => linksPath.push({from: l.data.from, to: l.data.to}));
		return linksPath;
	}

	/**
	 * update node templates depending on the actual scale
	 * @param {number} scale > actual zooming scale
	 * @param {InputEvent} inputEvent > triggered event object
	 **/
	setNodeTemplateByScale(scale?: number, inputEvent?: InputEvent): void {
		if (inputEvent.control) {
			if (scale >= 0.6446089162177968
				&& this.actualNodeTemplate !== NodeTemplateEnum.HIGH_SCALE) {
				this.actualNodeTemplate = NodeTemplateEnum.HIGH_SCALE;
				console.log('scale >= 0.6446089162177968');
				this.highScaleNodeTemplate();
			}
			if (scale < 0.6446089162177968 && scale > 0.4581115219913999
				&& this.actualNodeTemplate !== NodeTemplateEnum.MEDIUM_SCALE) {
				this.actualNodeTemplate = NodeTemplateEnum.MEDIUM_SCALE;
				console.log('scale < 0.6446089162177968');
				this.mediumScaleNodeTemplate();
			}
			if (scale <= 0.4581115219913999
				&& this.actualNodeTemplate !== NodeTemplateEnum.LOW_SCALE) {
				this.actualNodeTemplate = NodeTemplateEnum.LOW_SCALE;
				console.log('scale <= 0.4581115219913999');
				this.lowScaleNodeTemplate();
			}
		}
	}

	/**
	 * High scale node template, this is where nodes are most visible and provide more visual feedback
	 **/
	highScaleNodeTemplate(): void {
		this.diagram.commit(d => d.nodeTemplate = this.setNodeTemplate());
	}

	/**
	 * Medium scale node template, this is where nodes are visible but don't provide a lot of visual feedback
	 **/
	mediumScaleNodeTemplate(): void {
		if (this.mediumScaleTemplate) {
			return this.diagram.commit(d => {
				this.mediumScaleTemplate.toolTip = this.createTooltip();
				this.mediumScaleTemplate.contextMenu = this.contextMenu();
				d.nodeTemplate = this.mediumScaleTemplate;
			});
		}

		const node = new Node(Panel.Horizontal);

		// node.add(this.iconShape());

		// node.add(this.assetIconShape());
		node.toolTip = this.createTooltip();
		node.contextMenu = this.contextMenu();

		// if onNodeClick function is assigned directly to click handler
		// 'this' loses the binding to the component with onNodeClicked function
		node.click = (i, o) => this.onNodeClick(i, o);

		this.diagram.commit(d => d.nodeTemplate = node);
	}

	/**
	 * Low scale node template, this is where nodes are least visible and provide only color visual feedback
	 **/
	lowScaleNodeTemplate(): void {
		if (this.lowScaleTemplate) {
			return this.diagram.commit(d => {
				this.lowScaleTemplate.toolTip = this.createTooltip();
				this.lowScaleTemplate.contextMenu = this.contextMenu();
				d.nodeTemplate = this.lowScaleTemplate;
			});
		}

		const node = new Node(Panel.Horizontal);

		const  shape = new Shape();
		shape.figure = 'Rectangle';
		shape.background = 'red';
		shape.desiredSize = new Size(25, 35);
		shape.bind(new Binding('fill', 'status',
			(status: string) => this.getStatusColor(status)));
		node.toolTip = this.createTooltip();
		node.add(shape);
		node.contextMenu = this.contextMenu();

		// if onNodeClick function is assigned directly to click handler
		// 'this' loses the binding to the component with onNodeClicked function
		node.click = (i, o) => this.onNodeClick(i, o);

		this.diagram.commit(d => d.nodeTemplate = node);
	}

	/**
	 * Node bubble color based on status
	 **/
	getStatusColor(name: string): string {
		if (!this.icons || !this.icons[name && name.toLowerCase()]) { return '#ddd'; }
		return this.icons[name.toLowerCase()].background;
	}

	/**
	 * Node bubble color based on status
	 **/
	getStatusTextColor(name: string): string {
		if (!this.icons || !this.icons[name && name.toLowerCase()]) { return '#000'; }
		return this.icons[name.toLowerCase()].color;
	}

	/**
	 * handle to reset the overview index value to 0 so that it's not on top of all elements
	 **/
	resetOverviewIndex(): void {
		this.resetOvIndex = true;
	}

	/**
	 * handle to restore the overview index value so that it's on top of all elements
	 **/
	restoreOverviewIndex(): void {
		this.resetOvIndex = false;
	}

	/**
	 * Cleanup diagram canvas
	 */
	cleanUpDiagram(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this.diagram.clear();
	}

	/**
	 * Node Context menu containing a variety of operations like 'edit task', 'show task detail', 'start', 'hold', etc
	 **/
	contextMenu(): any {
		if (!this.tdsCtxMenu || !this.tdsCtxMenu.ctxMenu.nativeElement) { return; }
		const $ = GraphObject.make;
		return $(HTMLInfo,  // HTML element to contain the context menu
			{
				show: (obj: GraphObject, diagram: Diagram, tool: Tool) => this.showCtxMenu(obj, diagram, tool),
				mainElement: this.tdsCtxMenu.ctxMenu.nativeElement
			}
		); // end Adornment
	}

	/**
	 * handler to show context menu passing relevant data to context menu component
	 * @param {GraphObject} obj
	 * @param {Diagram} diagram
	 * @param {Tool} tool
	 **/
	showCtxMenu(obj: GraphObject, diagram: Diagram, tool: Tool): void {
		if (this.tdsCtxMenu) {
			const mousePt = diagram.lastInput.viewPoint;
			this.ctxMenuData$.next({
				selectedNode: obj.part.data,
				currentUser: this.currentUser,
				mousePt: {x: `${mousePt.x}px`, y: `${mousePt.y}px`},
				options: this.data && (this.data.ctxMenuOptions && this.data.ctxMenuOptions) || this.contextMenuOptions
			});
		}
	}

	/**
	 * Node tooltip with feedback about itself when in low or medium scale
	 **/
	createTooltip(): any {
		const $ = GraphObject.make;
		return $(HTMLInfo,  // HTML element to contain the context menu
			{
				show: (obj: GraphObject, diagram: Diagram, tool: Tool) => this.showTooltip(obj, diagram, tool),
				mainElement: this.nodeTooltip.nativeElement
			}
		); // end Adornment
	}

	/**
	 * handler to show the tooltip on low or medium scale nodes
	 * @param {GraphObject} obj
	 * @param {Diagram} diagram
	 * @param {Tool} tool
	 **/
	showTooltip(obj: GraphObject, diagram: Diagram, tool: Tool): void {
		const data = obj.part.data;
		if (this.nodeTooltip.nativeElement && (data && data.tooltipData)) {
			const mousePt = diagram.lastInput.viewPoint;
			this.renderer.setStyle(this.nodeTooltip.nativeElement, 'display', 'block');
			this.renderer.setStyle(this.nodeTooltip.nativeElement, 'left', `${mousePt.x + 10}px`);
			this.renderer.setStyle(this.nodeTooltip.nativeElement, 'top', `${mousePt.y}px`);
			this.tooltipData = data && data.tooltipData;
		}
	}

	/**
	 * Hide tooltip
	 */
	hideToolTip(): void {
		this.renderer.setStyle(this.nodeTooltip.nativeElement, 'display', 'none');
	}

	/**
	 * Zoom in on the diagram
	 **/
	zoomIn(): void {
		this.diagram.commandHandler.increaseZoom(1.2);
		const input = new InputEvent();
		input.control = true;
		this.setNodeTemplateByScale(this.diagram.scale, input);
	}

	/**
	 * Zoom out on the diagram
	 **/
	zoomOut(): void {
		this.diagram.commandHandler.decreaseZoom(0.8);
		const input = new InputEvent();
		input.control = true;
		this.setNodeTemplateByScale(this.diagram.scale, input);
	}

	/**
	 * Returns to view with the full graph displayed
	 */
	showFullGraph(): void {
		this.backToFullGraph.emit();
	}

	/**
	 * handler for context menu output "actionDispatched"
	 */
	onCtxMenuActionDispatched(action: string): void {
		this.ctxMenuActionDispatched.emit(action);
	}

	/**
	 * On Destroy lifecycle hook with listener for window:beforeunload
	 * to ensure hook is called when leaving the component
	 */
	@HostListener('window:beforeunload')
	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
