// Angular
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// Component
import { TabScrollerOverviewComponent } from './component/overview/tab-scroller-overview.component';
import { TabScrollerApiComponent } from './component/api/tab-scroller-api.component';

export class TabScrollerRoutingStates {
	public static readonly TABS_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/tab-scroller/overview'
	};
	public static readonly TABS_API_COMPONENT_STATE: any = {
		url: 'component/tab-scroller/api'
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: TabScrollerRoutingStates.TABS_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Tab Scroller Overview Component'
		},
		component: TabScrollerOverviewComponent,
		resolve: {}
	},
	{
		path: TabScrollerRoutingStates.TABS_API_COMPONENT_STATE.url,
		data: {
			title: 'Tab Scoller API Component'
		},
		component: TabScrollerApiComponent,
		resolve: {}
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)]
})
export class TabScrollerRoutingModule {
}
