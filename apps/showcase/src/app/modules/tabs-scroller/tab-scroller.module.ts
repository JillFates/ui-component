// Angular
import { NgModule } from '@angular/core';
// Clarity
import { ClarityModule } from '@clr/angular';
// Kendo
import { TabStripModule } from '@progress/kendo-angular-layout';
// Module
import { TabScrollerRoutingModule } from './tab-scroller-routing.module';
import { SharedModule } from '../../shared/shared.module';
// Components
import { TabScrollerOverviewComponent } from './component/overview/tab-scroller-overview.component';
import { TabScrollerApiComponent } from './component/api/tab-scroller-api.component';

@NgModule({
	imports: [
		SharedModule,
		ClarityModule,
		TabScrollerRoutingModule,
		TabStripModule
	],
	providers: [],
	declarations: [
		TabScrollerOverviewComponent,
		TabScrollerApiComponent
	],
	exports: [
		TabScrollerOverviewComponent
	]
})
export class TabScrollerModule { }
