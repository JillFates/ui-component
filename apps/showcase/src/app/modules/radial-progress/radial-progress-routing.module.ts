// Angular
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// Component
import { RadialProgressApiComponent } from './component/api/radial-progress-api.component';
import { RadialProgressOverviewComponent } from './component/overview/radial-progress-overview.component';

export class RadialProgressRoutingStates {
	public static readonly RADIAL_PROGRESS_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/radial-progress/overview',
	};
	public static readonly RADIAL_PROGRESS_API_COMPONENT_STATE: any = {
		url: 'component/radial-progress/api',
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: RadialProgressRoutingStates.RADIAL_PROGRESS_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Radial Progress Overview Component',
		},
		component: RadialProgressOverviewComponent,
		resolve: {},
	},
	{
		path: RadialProgressRoutingStates.RADIAL_PROGRESS_API_COMPONENT_STATE.url,
		data: {
			title: 'Radial Progress API Component',
		},
		component: RadialProgressApiComponent,
		resolve: {},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class RadialProgressRoutingModule {}
