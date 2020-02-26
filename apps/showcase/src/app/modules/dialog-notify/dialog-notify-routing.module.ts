// Angular
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// Component
import {DialogNotifyOverviewComponent} from './component/overview/dialog-notify-overview.component';
import {DialogNotifyApiComponent} from './component/api/dialog-notify-api.component';

export class DialogNotifyRoutingStates {
	public static readonly DIALOG_CONFIRM_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/dialog-notify/overview',
	};
	public static readonly DIALOG_CONFIRM_API_COMPONENT_STATE: any = {
		url: 'component/dialog-notify/api',
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: DialogNotifyRoutingStates.DIALOG_CONFIRM_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Dialog Notify Overview Component',
		},
		component: DialogNotifyOverviewComponent,
		resolve: {},
	},
	{
		path: DialogNotifyRoutingStates.DIALOG_CONFIRM_API_COMPONENT_STATE.url,
		data: {
			title: 'Dialog Notify API Component',
		},
		component: DialogNotifyApiComponent,
		resolve: {},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class DialogNotifyRoutingModule {
}
