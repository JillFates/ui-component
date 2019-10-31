import { Component } from '@angular/core';
import {
	ITdsContextMenuOption
} from '../../../../../../../../libs/tds-component-library/src/lib/context-menu/model/tds-context-menu.model';

@Component({
	selector: 'app-diagram-layout-overview',
	template: `
	<div class="diagram-layout-overview-component">
		<h2>Diagram Layout Component</h2>
		<div class="clr-row">
			<div class="clr-col-12">
				<h3>Example</h3>
			</div>
			<div class="clr-col-12">
				<tds-card>
					<tds-diagram-layout 
						[data]="data"
						[contextMenuOptions]="ctxOpts"></tds-diagram-layout>
				</tds-card>
			</div>
		</div>

		<div class="clr-row">
			<div class="clr-col-12">
				<h3>Usage Example</h3>
			</div>
			<div class="clr-col-12">
				<tds-card
					title="Diagram Layout Example"
					code='<tds-diagram-layout
					[data]="data" 
					[layout]="layoutObj"
					[nodeTemplate]="nodeTemplateObj"
					[linkTemplate]="linkTemplateObj"
					[lowScaleTemplate]="nodeTemplateObj"
					[mediumScaleTemplate]="nodeTemplateObj"
					[selectionTemplate]="adornmentTemplateObj"
					(nodeClicked)="handler($event)"
					(nodeUpdated)="handler($event)"
					(backToFullGraph)="handler($event)"
					(diagramAnimationFinished)="handler($event)"
					(ctxMenuActionDispatched)="handler($event)"
					></tds-diagram-layout>'
				>
				</tds-card>
			</div>
		</div>
	</div>
	`,
	styleUrls: ['./diagram-layout-overview.component.scss'],
})
export class DiagramLayoutOverviewComponent {
	data: any;
	ctxOpts:  ITdsContextMenuOption;

	constructor() {
		this.setData();
	}

	/**
	 * Sets the example data to be passed down to the diagram layout component
	 **/
	setData(): void {
		this.data = {
			nodeDataArray: [
				{
					name: 'test',
					key: 'a',
					status: 'hold'
				},
				{
					name: 'test 2',
					key: 'b',
					status: 'started'
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
					from: 'c',
					to: 'd'
				},
				{
					from: 'd',
					to: 'e'
				},
				{
					from: 'e',
					to: 'f'
				},
				{
					from: 'f',
					to: 'g'
				},
				{
					from: 'g',
					to: 'a'
				}
			]
		};
		this.ctxOpts = {
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
}
