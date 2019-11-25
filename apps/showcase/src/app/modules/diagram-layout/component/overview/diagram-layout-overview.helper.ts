import {Diagram, Layout, Link, Node, Shape, TreeLayout} from 'gojs';
import {IconModel, IDiagramData} from '../../../../../../../../libs/tds-component-library/src/lib/diagram-layout/model/diagram-data.model';
import {ITdsContextMenuOption} from '../../../../../../../../libs/tds-component-library/src/lib/context-menu/model/tds-context-menu.model';

export class DiagramLayoutOverviewHelper {

	/**
	 * Diagram data object
	 */
	static diagramData(currentUserId?: any, data?: any): IDiagramData {
		const d = this.data(data);
		return {
			nodeDataArray: d.nodeDataArray,
			linkDataArray: d.linkDataArray,
			currentUserId: currentUserId,
			ctxMenuOptions: this.contextMenuOptions(),
			nodeTemplate: this.nodeTemplate(),
			linkTemplate: this.linkTemplate(),
			layout: this.layout(),
			rootAsset: 'a',
			extras: this.extras()
		};
	}

	/**
	 * generate model to be used by diagram with task specific data
	 **/
	static data(data?: any): any {
		return {
			nodeDataArray: [
				{
					name: 'test',
					key: 'a',
					status: 'hold',
					tooltipData: {
						headerText: 'Test',
						headerBackgroundColor: '#0b63a8',
						headerTextColor: '#ffffff',
						data: [
							{
								label: 'Status',
								value: 'Hold'
							},
							{
								label: 'key',
								value: 'a'
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
	static getLinksPath(link: any): any {
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
	static nodeTemplate(): Node {
		return null;
	}

	/**
	 * Links Template
	 **/
	static linkTemplate(): Link {
		const linkTemplate = new Link();
		linkTemplate.routing = Link.AvoidsNodes;
		linkTemplate.corner = 5;

		const linkShape = new Shape();
		linkShape.strokeWidth = 5;
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
	static layout(): Layout {
		const treeLayout = new TreeLayout();
		treeLayout.angle = 90;
		treeLayout.layerSpacing = 35;
		return treeLayout;
	}

	/**
	 * Low scale node template
	 **/
	static lowScaleNodeTemplate(): Node {
		return null;
	}

	/**
	 * medium scale node template
	 **/
	static mediumScaleNodeTemplate(): Node {
		return null;
	}

	/**
	 * context menu options
	 **/
	static contextMenuOptions(): ITdsContextMenuOption {
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
				}
			]
		};
	}

	/**
	 * icons for the diagram
	 **/
	static icons(): IconModel {
		return null;
	}

	/**
	 * Extra parameters for the diagram
	 */
	static extras(): any {
		return {
			autoScale: Diagram.Uniform,
			allowZoom: false
		};
	}

}
