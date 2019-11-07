// Angular
import { NgModule } from '@angular/core';
// Clarity
import { ClarityModule } from '@clr/angular';
// Kendo
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
// Module
import { MultiselectRoutingModule } from './multiselect-routing.module';
import { SharedModule } from '../../shared/shared.module';
// Components
import { MultiselectOverviewComponent } from './component/overview/multiselect-overview.component';
import { MultiselectApiComponent } from './component/api/multiselect-api.component';

@NgModule({
	imports: [SharedModule, ClarityModule, DropDownsModule, MultiselectRoutingModule],
	providers: [],
	declarations: [MultiselectOverviewComponent, MultiselectApiComponent],
	exports: [MultiselectOverviewComponent],
})
export class MultiselectModule {}
