// Angular
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// Component
import { ButtonOverviewComponent } from './component/overview/button-overview.component';
import { ButtonApiComponent } from './component/api/button-api.component';

export class ButtonRoutingStates {
	public static readonly BUTTON_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/button/overview',
	};
	public static readonly BUTTON_API_COMPONENT_STATE: any = {
		url: 'component/button/api',
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: ButtonRoutingStates.BUTTON_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Button Overview Component',
		},
		component: ButtonOverviewComponent,
		resolve: {},
	},
	{
		path: ButtonRoutingStates.BUTTON_API_COMPONENT_STATE.url,
		data: {
			title: 'Button API Component',
		},
		component: ButtonApiComponent,
		resolve: {},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class ButtonRoutingModule {}
