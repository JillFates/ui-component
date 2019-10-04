// Angular
import { NgModule } from '@angular/core';
// Module
import {GridRoutingModule} from './grid-routing.module';
import {SharedModule} from '../../shared/shared.module';
// Components
import {GridOverviewComponent} from './component/overview/grid-overview.component';
import {GridApiComponent} from './component/api/grid-api.component';

@NgModule({
	imports: [
		SharedModule,
		GridRoutingModule
	],
	providers: [],
	declarations: [
		GridOverviewComponent,
		GridApiComponent
	],
	exports: [
		GridOverviewComponent
	]
})
export class GridModule {}
