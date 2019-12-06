// Angular
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// Component
import { GridInternalOverviewComponent } from './component/overview/grid-internal-overview.component';
import { GridInternalApiComponent } from './component/api/grid-internal-api.component';

export class GridInternalRoutingStates {
	public static readonly GRIDINTERNAL_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/grid-internal/overview',
	};
	public static readonly GRIDINTERNAL_API_COMPONENT_STATE: any = {
		url: 'component/grid-internal/api',
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: GridInternalRoutingStates.GRIDINTERNAL_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Internal Grid Components',
		},
		component: GridInternalOverviewComponent,
		resolve: {},
	},
	{
		path: GridInternalRoutingStates.GRIDINTERNAL_API_COMPONENT_STATE.url,
		data: {
			title: 'Internal Grid Components API',
		},
		component: GridInternalApiComponent,
		resolve: {},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class GridInternalRoutingModule {}
