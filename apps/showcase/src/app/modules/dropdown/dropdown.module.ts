// Angular
import { NgModule } from '@angular/core';
// Module
import {DropdownRoutingModule} from './dropdown-routing.module';
import {SharedModule} from '../../shared/shared.module';
// Components
import {DropdownOverviewComponent} from './component/overview/dropdown-overview.component';
import {DropdownApiComponent} from './component/api/dropdown-api.component';

@NgModule({
	imports: [
		SharedModule,
		DropdownRoutingModule
	],
	providers: [],
	declarations: [
		DropdownOverviewComponent,
		DropdownApiComponent
	],
	exports: [
		DropdownOverviewComponent
	]
})
export class DropdownModule {}
