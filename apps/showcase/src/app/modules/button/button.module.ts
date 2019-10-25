// Angular
import { NgModule } from '@angular/core';
// Module
import { ButtonRoutingModule } from './button-routing.module';
import { SharedModule } from '../../shared/shared.module';
// Components
import { ButtonOverviewComponent } from './component/overview/button-overview.component';
import { ButtonApiComponent } from './component/api/button-api.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
	imports: [SharedModule, ClarityModule, ButtonRoutingModule],
	providers: [],
	declarations: [ButtonOverviewComponent, ButtonApiComponent],
	exports: [ButtonOverviewComponent],
})
export class ButtonModule {}
