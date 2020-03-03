import { DialogDropdownRoutingModule } from './dialog-dropdown-routing.module';

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { DialogDropdownOverviewComponent } from './component/overview/dialog-dropdown-overview.component';
@NgModule({
	imports: [SharedModule, ClarityModule, DialogDropdownRoutingModule],
	providers: [],
	declarations: [DialogDropdownOverviewComponent],
	entryComponents: [],
})
export class DialogDropdownModule {}
