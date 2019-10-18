// Angular
import { NgModule } from '@angular/core';
// Module
import { KendoGridRoutingModule } from './kendo-grid-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';

// Components
import { KendoGridOverviewComponent } from './component/overview/kendo-grid-overview.component';
import { KendoGridApiComponent } from './component/api/kendo-grid-api.component';

@NgModule({
	imports: [SharedModule, ClarityModule, KendoGridRoutingModule],
	providers: [],
	declarations: [KendoGridOverviewComponent, KendoGridApiComponent],
	exports: [KendoGridOverviewComponent],
})
export class KendoGridModule {}
