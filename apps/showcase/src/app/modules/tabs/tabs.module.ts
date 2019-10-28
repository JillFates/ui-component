// Angular
import { NgModule } from '@angular/core';
// Clarity
import { ClarityModule } from '@clr/angular';
// Kendo
import { TabStripModule } from '@progress/kendo-angular-layout';
// Module
import { TabsRoutingModule } from './tabs-routing.module';
import { SharedModule } from '../../shared/shared.module';
// Components
import { TabsOverviewComponent } from './component/overview/tabs-overview.component';
import { TabsApiComponent } from './component/api/tabs-api.component';

@NgModule({
	imports: [
		SharedModule,
		ClarityModule,
		TabsRoutingModule,
		TabStripModule
	],
	providers: [],
	declarations: [
		TabsOverviewComponent,
		TabsApiComponent
	],
	exports: [
		TabsOverviewComponent
	]
})
export class TabsModule { }
