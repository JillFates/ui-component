// Angular
import { NgModule } from '@angular/core';
// Module
import { GridHeaderRoutingModule } from './grid-header-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';

// Components
import { GridHeaderOverviewComponent } from './component/overview/grid-header-overview.component';
import { GridHeaderApiComponent } from './component/api/grid-header-api.component';

@NgModule({
	imports: [SharedModule, ClarityModule, GridHeaderRoutingModule],
	providers: [],
	declarations: [GridHeaderOverviewComponent, GridHeaderApiComponent],
	exports: [GridHeaderOverviewComponent],
})
export class GridHeaderModule {}
