// Angular
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// Component
import {KendoGridOverviewComponent} from './component/overview/kendo-grid-overview.component';
import {KendoGridApiComponent} from './component/api/kendo-grid-api.component';

export class GridRoutingStates {
	public static readonly GRID_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/grid/overview'
	};
	public static readonly GRID_API_COMPONENT_STATE: any = {
		url: 'component/grid/api'
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: GridRoutingStates.GRID_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Grid Overview Component'
		},
		component: KendoGridOverviewComponent,
		resolve: {}
	},
	{
		path: GridRoutingStates.GRID_API_COMPONENT_STATE.url,
		data: {
			title: 'Grid API Component'
		},
		component: KendoGridApiComponent,
		resolve: {}
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)]
})
export class KendoGridRoutingModule {
}
