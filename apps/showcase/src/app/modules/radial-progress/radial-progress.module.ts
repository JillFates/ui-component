// Angular
import { NgModule } from '@angular/core';
// Module
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';

// Components
import { RadialProgressApiComponent } from './component/api/radial-progress-api.component';
import { RadialProgressOverviewComponent } from './component/overview/radial-progress-overview.component';
import { RadialProgressRoutingModule } from './radial-progress-routing.module';

@NgModule({
	imports: [SharedModule, ClarityModule, RadialProgressRoutingModule],
	providers: [],
	declarations: [RadialProgressApiComponent, RadialProgressOverviewComponent],
	exports: [RadialProgressOverviewComponent],
})
export class RadialProgressModule {}
