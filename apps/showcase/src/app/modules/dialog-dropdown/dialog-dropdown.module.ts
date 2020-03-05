import { DropdownEscapeComponent } from './component/dropdown-escape/dropdown-escape.component';
import { DialogDropdownRoutingModule } from './dialog-dropdown-routing.module';

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { DialogDropdownOverviewComponent } from './component/overview/dialog-dropdown-overview.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
@NgModule({
	imports: [SharedModule, ClarityModule, DialogDropdownRoutingModule, DropDownsModule],
	providers: [],
	declarations: [DialogDropdownOverviewComponent, DropdownEscapeComponent],
	exports: [DropdownEscapeComponent],
	entryComponents: [DropdownEscapeComponent],
})
export class DialogDropdownModule {}
