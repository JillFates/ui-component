// Angular
import { NgModule } from '@angular/core';
// Module
import {GridRoutingModule} from './grid-routing.module';
import {SharedModule} from '../../shared/shared.module';
// Components
import {GridOverviewComponent} from './component/overview/grid-overview.component';
import {GridTaskManagerComponent} from './component/grid-task-manager/grid-task-manager.component';
import {GridApiComponent} from './component/api/grid-api.component';

@NgModule({
	imports: [
		SharedModule,
		GridRoutingModule
	],
	providers: [],
	declarations: [
		GridOverviewComponent,
		GridApiComponent,
		GridTaskManagerComponent
	],
	exports: [
		GridOverviewComponent,
		GridTaskManagerComponent
	]
})
export class GridModule {}
