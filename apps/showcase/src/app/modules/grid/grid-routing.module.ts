// Angular
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// Component
import { GridOverviewComponent } from './component/overview/grid-overview.component';
import { GridApiComponent } from './component/api/grid-api.component';

export class GridRoutingStates {
	public static readonly GRID_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/tds-grid/overview',
	};
	public static readonly GRID_API_COMPONENT_STATE: any = {
		url: 'component/tds-grid/api',
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: GridRoutingStates.GRID_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'TDS Grid Component',
		},
		component: GridOverviewComponent,
		resolve: {},
	},
	{
		path: GridRoutingStates.GRID_API_COMPONENT_STATE.url,
		data: {
			title: 'TDS Grid Component API',
		},
		component: GridApiComponent,
		resolve: {},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class GridRoutingModule {}
