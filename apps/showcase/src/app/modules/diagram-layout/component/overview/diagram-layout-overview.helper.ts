import {Binding, Diagram, GraphObject, Layout, Link, Margin, Node, Panel, Shape, TextBlock, TreeLayout} from 'gojs';
import {IconModel, IDiagramData} from '../../../../../../../../libs/tds-component-library/src/lib/diagram-layout/model/diagram-data.model';
import {ITdsContextMenuOption} from '../../../../../../../../libs/tds-component-library/src/lib/context-menu/model/tds-context-menu.model';
import {IDiagramLayoutHelper} from '../../../../../../../../libs/tds-component-library/src/lib/diagram-layout/model/diagram-layout.helper';

export class DiagramLayoutOverviewHelper implements IDiagramLayoutHelper {

	constructor() {
		// Constructor
	}

	diagramData(params?: any): IDiagramData {
		const d = this.data(params.data);
		return {
			nodeDataArray: d.nodeDataArray,
			linkDataArray: d.linkDataArray,
			currentUserId: params.currentUserId,
			ctxMenuOptions: this.contextMenuOptions(),
			nodeTemplate: this.nodeTemplate({ isExpandable: params.extras && params.extras.isExpandable }),
			linkTemplate: this.linkTemplate(),
			layout: this.layout(),
			rootNode: 'a',
			extras: !!params.extras && params.extras || this.extras(),
			events: params && params.events || this.diagramEvents()
		};
	}

	/**
	 * generate model to be used by diagram with task specific data
	 **/
	data(data?: any): any {
		return {
			nodeDataArray: [
				{
					name: 'test',
					key: 'a',
					status: 'hold',
					tooltipData: {
						// tslint:disable-next-line:max-line-length
						headerText: 'test',
						headerBackgroundColor: '#0b63a8',
						headerTextColor: '#ffffff',
						data: [
							{
								label: 'Status',
								value: 'Hold',
								icon: 'faPlay'
							},
							{
								label: 'key',
								value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
							},
							{
								label: 'label1',
								value: 'a'
							},
							{
								label: 'label2',
								value: 'a'
							},
							{
								label: 'label3',
								value: 'a'
							},
							{
								label: 'label4',
								value: 'a'
							}
						]
					}
				},
				{
					name: 'test 2',
					key: 'b',
					status: 'started',
					tooltipData: {
						headerText: 'test 2',
						headerBackgroundColor: '#0b63a8',
						headerTextColor: '#ffffff',
						data: [
							{
								label: 'Status',
								value: 'Started'
							},
							{
								label: 'key',
								value: 'b'
							}
						]
					}
				},
				{
					name: 'test 3',
					key: 'c',
					status: 'pending'
				},
				{
					name: 'test 4',
					key: 'd',
					status: 'pending'
				},
				{
					name: 'test 5',
					key: 'e',
					status: 'pending'
				},
				{
					name: 'test 6',
					key: 'f',
					status: 'pending'
				},
				{
					name: 'test 7',
					key: 'g',
					status: 'pending'
				},
				{
					name: 'test 8',
					key: 'h',
					status: 'pending'
				},
				{
					name: 'test 9',
					key: 'i',
					status: 'pending'
				},
				{
					name: 'test 10',
					key: 'j',
					status: 'pending'
				},
				{
					name: 'test 11',
					key: 'k',
					status: 'pending'
				},
				{
					name: 'test 12',
					key: 'l',
					status: 'pending'
				},
				{
					name: 'test 13',
					key: 'm',
					status: 'pending'
				},
				{
					name: 'test 14',
					key: 'n',
					status: 'pending'
				},
				{
					name: 'test 15',
					key: 'o',
					status: 'pending'
				},
				{
					name: 'test 16',
					key: 'p',
					status: 'pending'
				},
				{
					name: 'test 17',
					key: 'q',
					status: 'pending'
				},
				{
					name: 'test 18',
					key: 'r',
					status: 'pending'
				},
				{
					name: 'test 19',
					key: 's',
					status: 'pending'
				},
				{
					name: 'test 20',
					key: 't',
					status: 'pending'
				},
				{
					name: 'test 21',
					key: 'u',
					status: 'pending'
				},
				{
					name: 'test 22',
					key: 'v',
					status: 'pending'
				},
				{
					name: 'test 23',
					key: 'w',
					status: 'pending'
				},
				{
					name: 'test 24',
					key: 'x',
					status: 'pending'
				},
				{
					name: 'test 25',
					key: 'y',
					status: 'pending'
				},
				{
					name: 'test 26',
					key: 'z',
					status: 'pending'
				},
				{
					name: 'test 27',
					key: 'aa',
					status: 'pending'
				},
				{
					name: 'test 28',
					key: 'bb',
					status: 'pending'
				},
				{
					name: 'test 29',
					key: 'cc',
					status: 'pending'
				},
				{
					name: 'test 30',
					key: 'dd',
					status: 'pending'
				},
				{
					name: 'test 31',
					key: 'ee',
					status: 'pending'
				},
				{
					name: 'test 32',
					key: 'ff',
					status: 'pending'
				},
				{
					name: 'test 33',
					key: 'gg',
					status: 'pending'
				},
				{
					name: 'test 34',
					key: 'hh',
					status: 'pending'
				},
				{
					name: 'test 35',
					key: 'ii',
					status: 'pending'
				}
			],
			linkDataArray: [
				{
					from: 'a',
					to: 'b'
				},
				{
					from: 'b',
					to: 'c'
				},
				{
					from: 'b',
					to: 'd'
				},
				{
					from: 'b',
					to: 'e'
				},
				{
					from: 'b',
					to: 'f'
				},
				{
					from: 'b',
					to: 'g'
				},
				{
					from: 'a',
					to: 'h'
				},
				{
					from: 'h',
					to: 'i'
				},
				{
					from: 'h',
					to: 'j'
				},
				{
					from: 'h',
					to: 'k'
				},
				{
					from: 'h',
					to: 'l'
				},
				{
					from: 'h',
					to: 'm'
				},
				{
					from: 'h',
					to: 'n'
				},
				{
					from: 'h',
					to: 'o'
				},
				{
					from: 'h',
					to: 'p'
				},
				{
					from: 'h',
					to: 'q'
				},
				{
					from: 'c',
					to: 'r'
				},
				{
					from: 'c',
					to: 's'
				},
				{
					from: 'c',
					to: 't'
				},
				{
					from: 'j',
					to: 'u'
				},
				{
					from: 'j',
					to: 'v'
				},
				{
					from: 'j',
					to: 'w'
				},
				{
					from: 'j',
					to: 'x'
				},
				{
					from: 'j',
					to: 'y'
				},
				{
					from: 'y',
					to: 'z'
				},
				{
					from: 'z',
					to: 'aa'
				},
				{
					from: 'z',
					to: 'bb'
				},
				{
					from: 'bb',
					to: 'cc'
				},
				{
					from: 'cc',
					to: 'dd'
				},
				{
					from: 'dd',
					to: 'ee'
				},
				{
					from: 'ee',
					to: 'ff'
				},
				{
					from: 'ee',
					to: 'gg'
				},
				{
					from: 'ee',
					to: 'hh'
				},
				{
					from: 'ee',
					to: 'ii'
				}
			],
		};
	}

	/**
	 * LinksPath object
	 **/
	getLinksPath(link: any): any {
		const t = Object.assign({}, link);
		if (t) {
			return {
				from: t.parentId,
				to: t.childId
			};
		}
		return null;
	}

	/**
	 * Node template
	 **/
	nodeTemplate(opts?: any): Node {
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

		if (opts.isExpandable) {
			node.isTreeExpanded = false;
			const expandButton = GraphObject.make('TreeExpanderButton');
			node.add(expandButton);
		}

		return node;
	}

	/**
	 * Links Template
	 **/
	linkTemplate(): Link {
		const linkTemplate = new Link();
		linkTemplate.routing = Link.AvoidsNodes;
		linkTemplate.corner = 2;

		const linkShape = new Shape();
		linkShape.strokeWidth = 2;
		linkShape.stroke = '#ddd';
		const arrowHead = new Shape();
		arrowHead.toArrow = 'Standard';
		arrowHead.stroke = '#333';
		arrowHead.fill = '#ddd';

		linkTemplate.add(linkShape);
		linkTemplate.add(arrowHead);

		return linkTemplate;
	}

	/**
	 * Layout template
	 **/
	layout(): Layout {
		const treeLayout = new TreeLayout();
		treeLayout.angle = 90;
		treeLayout.layerSpacing = 35;
		return treeLayout;
	}

	/**
	 * Low scale node template
	 **/
	lowScaleNodeTemplate(): Node {
		return null;
	}

	/**
	 * medium scale node template
	 **/
	mediumScaleNodeTemplate(): Node {
		return null;
	}

	/**
	 * context menu options
	 **/
	contextMenuOptions(): ITdsContextMenuOption {
		return {
			fields: [
				{
					label: 'test1',
					event: 'test1',
					icon: {
						icon: 'faUser'
					},
					status: 'stat',
					isAvailable: (n: any) => !(n.status === 'hold'),
					hasPermission: () => ['view', 'edit'].includes('view')
				},
				{
					label: 'test2',
					event: 'test2',
					icon: {
						icon: 'faUser'
					},
					status: 'stat',
					isAvailable: (n: any) => !(n.status === 'started'),
					hasPermission: () => ['view', 'edit'].includes('view')
				},
				{
					label: 'test3',
					event: 'test3',
					icon: {
						icon: 'faUser'
					},
					status: 'stat',
					isAvailable: (n: any) => !(n.status === 'started'),
					hasPermission: () => ['view', 'edit'].includes('view')
				}
			]
		};
	}

	/**
	 * Diagram events
	 */
	diagramEvents(): any[] {
		return null;
	}

	/**
	 * icons for the diagram
	 **/
	icons(): IconModel {
		return null;
	}

	/**
	 * Extra parameters for the diagram
	 */
	extras(): any {
		return {
			autoScale: Diagram.Uniform,
			allowZoom: false
		};
	}

}
