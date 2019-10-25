import {AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import * as go from 'gojs';
import {IDiagramData} from './model/diagram-data.model';
@Component({
	selector: 'tds-diagram-layout',
	template: `
		<div id="diagram-container" 
				 class="diagram-container" 
				 [style.height]="screenHeight"
				 #diagramContainer>
			
		</div>
	`,
	styleUrls: ['./diagram-layout.component.scss'],
})
export class DiagramLayoutComponent implements OnChanges, AfterViewInit {
	@Input() data: IDiagramData;
	@ViewChild('diagramContainer', {static: false}) diagramContainer: ElementRef;
	model: go.Model;
	diagram: go.Diagram = new go.Diagram();
	screenHeight: string;

	constructor() {
		// Constructor
	}
	/**
	 * Detect changes to update nodeData and linksPath accordingly
	 **/
	ngOnChanges(changes: SimpleChanges): void {
		if (changes && changes.model) {
			this.loadAll();
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
		this.model = new go.GraphLinksModel(this.data.nodeDataArray, this.data.linkDataArray);
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
		this.diagram.commit(d => {
			d.layout = this.layout();
			d.nodeTemplate = this.nodeTemplate();
			d.linkTemplate = this.linkTemplate();
		});
		this.diagram.model = this.model;
	}

	/**
	 * Sets the template for each node in the Diagram
	 **/
	nodeTemplate(): go.Node {
		const node = new go.Node(go.Panel.Horizontal);
		node.margin = new go.Margin(1, 1, 1, 1);

		const panel = new go.Panel(go.Panel.Auto);
		panel.background = '#fff';
		panel.padding = new go.Margin(0, 0, 0, 0);

		const nodeShape = new go.Shape();
		nodeShape.figure = 'RoundedRectangle';
		nodeShape.strokeWidth = 2;
		nodeShape.stroke = '#ddd';
		nodeShape.fill = 'white';

		const panelBody = new go.Panel(go.Panel.Horizontal);
		panel.padding = new go.Margin(0, 0, 0, 0);
		panel.margin = new go.Margin(0, 0, 0, 0);
		const textBlock = new go.TextBlock();
		textBlock.stroke = '#333';
		textBlock.bind(new go.Binding('text', 'name'));
		panelBody.add(textBlock);

		panel.add(nodeShape);
		panel.add(panelBody);

		node.add(panel);

		return node;
	}

	/**
	 * Sets the template for each node link in the Diagram
	 **/
	linkTemplate(): go.Link {
		const link = new go.Link();
		link.routing = go.Link.AvoidsNodes;
		link.corner = 5;
		const containerShape = new go.Shape();
		const arrowHead = new go.Shape();
		arrowHead.toArrow = 'Standard';
		link.add(containerShape);
		link.add(arrowHead);
		return link;
	}

	/**
	 * Sets the Layout to be used by the Diagram
	 **/
	layout(): go.Layout {
		const layout = new go.CircularLayout();
		layout.radius = 100;
		layout.spacing = 0;
		layout.nodeDiameterFormula = go.CircularLayout.Circular;
		layout.startAngle = 270;

		return layout;
	}
}
