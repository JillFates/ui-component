// Angular
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// Component
import { GridHeaderOverviewComponent } from './component/overview/grid-header-overview.component';
import { GridHeaderApiComponent } from './component/api/grid-header-api.component';

export class GridHeaderRoutingStates {
	public static readonly GRIDHEADER_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/grid-header/overview',
	};
	public static readonly GRIDHEADER_API_COMPONENT_STATE: any = {
		url: 'component/grid-header/api',
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: GridHeaderRoutingStates.GRIDHEADER_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Grid Header Overview Component',
		},
		component: GridHeaderOverviewComponent,
		resolve: {},
	},
	{
		path: GridHeaderRoutingStates.GRIDHEADER_API_COMPONENT_STATE.url,
		data: {
			title: 'Grid Header API Component',
		},
		component: GridHeaderApiComponent,
		resolve: {},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class GridHeaderRoutingModule {}
