// Angular
import { NgModule } from '@angular/core';
// Module
import { DiagramLayoutRoutingModule } from './diagram-layout-routing.module';
import { SharedModule } from '../../shared/shared.module';
// Components
import { DiagramLayoutOverviewComponent } from './component/overview/diagram-layout-overview.component';
import { DiagramLayoutApiComponent } from './component/api/diagram-layout-api.component';

@NgModule({
	imports: [SharedModule, DiagramLayoutRoutingModule],
	providers: [],
	declarations: [DiagramLayoutOverviewComponent, DiagramLayoutApiComponent],
	exports: [DiagramLayoutOverviewComponent],
})
export class DiagramLayoutModule {}
