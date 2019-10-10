// Angular
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// Component
import {DropdownOverviewComponent} from './component/overview/dropdown-overview.component';
import {DropdownApiComponent} from './component/api/dropdown-api.component';

export class DropdownRoutingStates {
	public static readonly DROPDOWN_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/dropdown/overview'
	};
	public static readonly DROPDOWN_API_COMPONENT_STATE: any = {
		url: 'component/dropdown/api'
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: DropdownRoutingStates.DROPDOWN_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Dropdown Overview Component'
		},
		component: DropdownOverviewComponent,
		resolve: {}
	},
	{
		path: DropdownRoutingStates.DROPDOWN_API_COMPONENT_STATE.url,
		data: {
			title: 'Dropdown API Component'
		},
		component: DropdownApiComponent,
		resolve: {}
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)]
})
export class DropdownRoutingModule {
}
