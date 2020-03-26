import { Component } from '@angular/core';
import {
	ITdsContextMenuOption
} from '../../../../../../../../libs/tds-component-library/src/lib/context-menu/model/tds-context-menu.model';
import {ReplaySubject} from 'rxjs';
import {DiagramLayoutOverviewHelper} from './diagram-layout-overview.helper';
import {Diagram} from 'gojs';
import {IDiagramLayoutHelper} from '../../../../../../../../libs/tds-component-library/src/lib/diagram-layout/model/diagram-layout.helper';

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
							[data]="data$ | async"
							[hideExpand]="false"
							[isExpandable]="hasExpandableNodes"
							[initialExpandLevel]="3"
							(expandActionDispatched)="expandActionDispatched()"
							(initialAnimationStarting)="diagramInit()"
							(diagramAnimationFinished)="diagramFinish()"></tds-lib-diagram-layout>
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
	data$: ReplaySubject<any> = new ReplaySubject<any>(1);
	ctxOpts:  ITdsContextMenuOption;
	diagramHelper: IDiagramLayoutHelper;
	hasExpandableNodes: boolean;

	constructor() {
		this.hasExpandableNodes = true;
		this.setData();
	}

	/**
	 * Sets the example data to be passed down to the diagram layout component
	 **/
	setData(): void {
		this.diagramHelper = new DiagramLayoutOverviewHelper({isExpandable: this.hasExpandableNodes});
		this.data$.next(this.diagramHelper.diagramData({
				currentUserId: 1,
				data: null,
				extras: {
					initialAutoScale: Diagram.Uniform,
					allowZoom: true
				}
			})
		);
	}

	/**
	 * diagram animation is starting
	 */
	diagramInit(): void {
		console.log('gif init');
	}

	/**
	 * diagram animation has finished
	 */
	diagramFinish(): void {
		console.log('gif completed');
	}

	/**
	 * log some text on the console when the expandActionDispatched is triggered
	 */
	expandActionDispatched(): void {
		console.log('expandActionDispatched');
	}
}
