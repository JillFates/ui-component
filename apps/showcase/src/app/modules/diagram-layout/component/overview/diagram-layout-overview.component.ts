import { Component } from '@angular/core';

@Component({
	selector: 'app-diagram-layout-overview',
	template: `
	<div class="button-overview-component">
		<h2>Diagram Layout Component</h2>
		<div class="clr-row">
			<div class="clr-col-12">
				<h3>Example</h3>
			</div>
			<div class="clr-col-12">
				<tds-card>
					<tds-diagram-layout [data]="data"></tds-diagram-layout>
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
					(nodeClicked)="nodeClickedHandler($event)"
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
					key: 'a'
				},
				{
					name: 'test 2',
					key: 'b'
				},
				{
					name: 'test 3',
					key: 'c'
				},
				{
					name: 'test 4',
					key: 'd'
				},
				{
					name: 'test 5',
					key: 'e'
				},
				{
					name: 'test 6',
					key: 'f'
				},
				{
					name: 'test 7',
					key: 'g'
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
	}
}
