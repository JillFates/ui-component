// Angular
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// Component
import { ComboboxOverviewComponent } from './component/overview/combobox-overview.component';
import { ComboboxApiComponent } from './component/api/combobox-api.component';

export class ComboboxRoutingStates {
	public static readonly COMBOBOX_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/combobox/overview',
	};
	public static readonly COMBOBOX_API_COMPONENT_STATE: any = {
		url: 'component/combobox/api',
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: ComboboxRoutingStates.COMBOBOX_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Combobox Overview Component',
		},
		component: ComboboxOverviewComponent,
		resolve: {},
	},
	{
		path: ComboboxRoutingStates.COMBOBOX_API_COMPONENT_STATE.url,
		data: {
			title: 'Combobox API Component',
		},
		component: ComboboxApiComponent,
		resolve: {},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class ComboboxRoutingModule {}
