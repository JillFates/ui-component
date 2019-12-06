// Angular
import { NgModule } from '@angular/core';
// Module
import { GridInternalRoutingModule } from './grid-internal-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';

// Components
import { GridInternalOverviewComponent } from './component/overview/grid-internal-overview.component';
import { GridInternalApiComponent } from './component/api/grid-internal-api.component';

@NgModule({
	imports: [SharedModule, ClarityModule, GridInternalRoutingModule],
	providers: [],
	declarations: [GridInternalOverviewComponent, GridInternalApiComponent],
	exports: [GridInternalOverviewComponent],
})
export class GridInternalModule {}
