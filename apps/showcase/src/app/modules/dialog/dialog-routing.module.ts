// Angular
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// Component
import {DialogOverviewComponent} from './component/overview/dialog-overview.component';
import {DialogApiComponent} from './component/api/dialog-api.component';

export class DialogRoutingStates {
	public static readonly DIALOG_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/dialog/overview',
	};
	public static readonly DIALOG_API_COMPONENT_STATE: any = {
		url: 'component/dialog/api',
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: DialogRoutingStates.DIALOG_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Dialog Overview Component',
		},
		component: DialogOverviewComponent,
		resolve: {},
	},
	{
		path: DialogRoutingStates.DIALOG_API_COMPONENT_STATE.url,
		data: {
			title: 'Dialog API Component',
		},
		component: DialogApiComponent,
		resolve: {},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class DialogRoutingModule {
}
