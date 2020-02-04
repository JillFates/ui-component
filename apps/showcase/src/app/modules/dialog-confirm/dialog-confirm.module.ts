// Angular
import {NgModule} from '@angular/core';
// Module
import {DialogConfirmRoutingModule} from './dialog-confirm-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ClarityModule} from '@clr/angular';
// Components
import {DialogConfirmOverviewComponent} from './component/overview/dialog-confirm-overview.component';
import {DialogConfirmApiComponent} from './component/api/dialog-confirm-api.component';

@NgModule({
	imports: [
		SharedModule,
		ClarityModule,
		DialogConfirmRoutingModule
	],
	providers: [],
	declarations: [
		DialogConfirmOverviewComponent,
		DialogConfirmApiComponent
	],
	entryComponents: [
	]
})
export class DialogConfirmModule {
}
