
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { DialogDropdownOverviewComponent } from './component/overview/dialog-dropdown-overview.component';
export class DialogDropdownRoutingStates {
	public static readonly DIALOG_DROPDOWN_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/dialog-dropdown/overview',
	};
	public static readonly DIALOG_DROPDOWN_API_COMPONENT_STATE: any = {
		url: 'component/dialog-dropdown/api',
	};
}
export const ComponentsRoutes: Routes = [
	{
		path: DialogDropdownRoutingStates.DIALOG_DROPDOWN_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Dialog Dropdown Overview Component',
		},
		component: DialogDropdownOverviewComponent,
		resolve: {},
	},
	// {
	// 	path: DialogDropdownRoutingStates.DIALOG_DROPDOWN_API_COMPONENT_STATE.url,
	// 	data: {
	// 		title: 'Dialog Dropdown API Component',
	// 	},
	// 	component: DialogDropdownApiComponent,
	// 	resolve: {},
	// },
];
@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class DialogDropdownRoutingModule {

}