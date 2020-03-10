import { DialogTooltipOverviewComponent } from './component/overview/dialog-tooltip-overview.component';
import {
	DialogDropdownRoutingModule,
	DialogDropdownRoutingStates,
} from './../dialog-dropdown/dialog-dropdown-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export class DialogTooltipRoutingStates {
	public static readonly DIALOG_TOOLTIP_OVERVIEW_COMPONENT_STATE: any = {
		url: 'component/dialog-tooltip/overview',
	};
}

export const ComponentsRoutes: Routes = [
	{
		path: DialogTooltipRoutingStates.DIALOG_TOOLTIP_OVERVIEW_COMPONENT_STATE.url,
		data: {
			title: 'Dialog Tooltip Overview Components',
		},
		component: DialogTooltipOverviewComponent,
		resolve: {},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(ComponentsRoutes)],
})
export class DialogTooltipRoutingModule {}
