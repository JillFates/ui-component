// Angular
import { NgModule } from '@angular/core';
// Clarity
import { ClarityModule } from '@clr/angular';
// Kendo
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
// Module
import { ComboboxRoutingModule } from './combobox-routing.module';
import { SharedModule } from '../../shared/shared.module';
// Components
import { ComboboxOverviewComponent } from './component/overview/combobox-overview.component';
import { ComboboxApiComponent } from './component/api/combobox-api.component';

@NgModule({
	imports: [SharedModule, ClarityModule, DropDownsModule, ComboboxRoutingModule],
	providers: [],
	declarations: [ComboboxOverviewComponent, ComboboxApiComponent],
	exports: [ComboboxOverviewComponent],
})
export class ComboboxModule {}
