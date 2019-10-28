// Angular
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// Component
import {TabsOverviewComponent} from './component/overview/tabs-overview.component';
import {TabsApiComponent} from './component/api/tabs-api.component';

export class TabsRoutingStates {
	public static readonly TABS_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/tabs/overview'
	};
	public static readonly TABS_API_COMPONENT_STATE: any = {
		url: 'component/tabs/api'
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: TabsRoutingStates.TABS_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Tabs Overview Component'
		},
		component: TabsOverviewComponent,
		resolve: {}
	},
	{
		path: TabsRoutingStates.TABS_API_COMPONENT_STATE.url,
		data: {
			title: 'Tabs API Component'
		},
		component: TabsApiComponent,
		resolve: {}
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)]
})
export class TabsRoutingModule {
}
