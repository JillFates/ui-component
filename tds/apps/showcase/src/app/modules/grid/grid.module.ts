// Angular
import { NgModule } from '@angular/core';
// Module
import {GridRoutingModule} from './grid-routing.module';
// Components
import {GridOverviewComponent} from './component/overview/grid-overview.component';
import {GridApiComponent} from './component/api/grid-api.component';

@NgModule({
	imports: [
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
