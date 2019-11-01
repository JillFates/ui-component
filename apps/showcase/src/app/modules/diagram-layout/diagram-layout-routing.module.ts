// Angular
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// Component
import { DiagramLayoutOverviewComponent } from './component/overview/diagram-layout-overview.component';
import { DiagramLayoutApiComponent } from './component/api/diagram-layout-api.component';

export class DiagramLayoutRoutingStates {
	public static readonly DIAGRAM_LAYOUT_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/diagram-layout/overview',
	};
	public static readonly DIAGRAM_LAYOUT_API_COMPONENT_STATE: any = {
		url: 'component/diagram-layout/api',
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: DiagramLayoutRoutingStates.DIAGRAM_LAYOUT_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'DiagramLayout Overview Component',
		},
		component: DiagramLayoutOverviewComponent,
		resolve: {},
	},
	{
		path: DiagramLayoutRoutingStates.DIAGRAM_LAYOUT_API_COMPONENT_STATE.url,
		data: {
			title: 'DiagramLayout API Component',
		},
		component: DiagramLayoutApiComponent,
		resolve: {},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class DiagramLayoutRoutingModule {}
