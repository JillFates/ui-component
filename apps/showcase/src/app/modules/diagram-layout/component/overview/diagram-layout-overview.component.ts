import { Component } from '@angular/core';
import {
	ITdsContextMenuOption
} from '../../../../../../../../libs/tds-component-library/src/lib/context-menu/model/tds-context-menu.model';

@Component({
	selector: 'app-diagram-layout-overview',
	template: `
	<div class="diagram-layout-overview-component">
		<h2>Diagram Layout Component Overview</h2>
		<div class="clr-row">
			<div class="clr-col-12">
				<h3>Example</h3>
			</div>
			<div class="clr-col-12">
				<p>Diagram created with the GoJS Api</p>
			</div>
			<div class="clr-col-12">
				<tds-card>
					<div class="diagram-card-container">
						<tds-lib-diagram-layout
							[data]="data"
							[contextMenuOptions]="ctxOpts"
							[hideExpand]="false"
							(expandActionDispatched)="expandActionDispatched()"></tds-lib-diagram-layout>
					</div>
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
					[hideExpand]="false"
					[hideOverview="true"
					[hideControlButtons]"true"
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

	/**
	 * log some text on the console when the expandActionDispatched is triggered
	 */
	expandActionDispatched(): void {
		console.log('expandActionDispatched');
	}
}
