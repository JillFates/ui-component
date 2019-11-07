// Angular
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// Component
import { MultiselectOverviewComponent } from './component/overview/multiselect-overview.component';
import { MultiselectApiComponent } from './component/api/multiselect-api.component';

export class MultiselectRoutingStates {
	public static readonly MULTISELECT_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/multiselect/overview',
	};
	public static readonly MULTISELECT_API_COMPONENT_STATE: any = {
		url: 'component/multiselect/api',
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: MultiselectRoutingStates.MULTISELECT_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Multiselect Overview Component',
		},
		component: MultiselectOverviewComponent,
		resolve: {},
	},
	{
		path: MultiselectRoutingStates.MULTISELECT_API_COMPONENT_STATE.url,
		data: {
			title: 'Multiselect API Component',
		},
		component: MultiselectApiComponent,
		resolve: {},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class MultiselectRoutingModule {}
