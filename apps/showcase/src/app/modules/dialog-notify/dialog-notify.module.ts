// Angular
import {NgModule} from '@angular/core';
// Module
import {DialogNotifyRoutingModule} from './dialog-notify-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ClarityModule} from '@clr/angular';
// Components
import {DialogNotifyOverviewComponent} from './component/overview/dialog-notify-overview.component';
import {DialogNotifyApiComponent} from './component/api/dialog-notify-api.component';

@NgModule({
	imports: [
		SharedModule,
		ClarityModule,
		DialogNotifyRoutingModule
	],
	providers: [],
	declarations: [
		DialogNotifyOverviewComponent,
		DialogNotifyApiComponent
	],
	entryComponents: [
	]
})
export class DialogNotifyModule {
}
