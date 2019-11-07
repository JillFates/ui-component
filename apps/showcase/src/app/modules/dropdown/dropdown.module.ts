// Angular
import { NgModule } from '@angular/core';
// Clarity
import { ClarityModule } from '@clr/angular';
// Kendo
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
// Module
import { DropdownRoutingModule } from './dropdown-routing.module';
import { SharedModule } from '../../shared/shared.module';
// Components
import { DropdownOverviewComponent } from './component/overview/dropdown-overview.component';
import { DropdownApiComponent } from './component/api/dropdown-api.component';

@NgModule({
	imports: [SharedModule, ClarityModule, DropDownsModule, DropdownRoutingModule],
	providers: [],
	declarations: [DropdownOverviewComponent, DropdownApiComponent],
	exports: [DropdownOverviewComponent],
})
export class DropdownModule {}
