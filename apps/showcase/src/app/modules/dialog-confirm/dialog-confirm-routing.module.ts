// Angular
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// Component
import {DialogConfirmOverviewComponent} from './component/overview/dialog-confirm-overview.component';
import {DialogConfirmApiComponent} from './component/api/dialog-confirm-api.component';

export class DialogConfirmRoutingStates {
	public static readonly DIALOG_CONFIRM_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/dialog-confirm/overview',
	};
	public static readonly DIALOG_CONFIRM_API_COMPONENT_STATE: any = {
		url: 'component/dialog-confirm/api',
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: DialogConfirmRoutingStates.DIALOG_CONFIRM_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Dialog Confirm Overview Component',
		},
		component: DialogConfirmOverviewComponent,
		resolve: {},
	},
	{
		path: DialogConfirmRoutingStates.DIALOG_CONFIRM_API_COMPONENT_STATE.url,
		data: {
			title: 'Dialog Confirm API Component',
		},
		component: DialogConfirmApiComponent,
		resolve: {},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class DialogConfirmRoutingModule {
}
