// Angular
import {NgModule} from '@angular/core';
// Module
import {DialogRoutingModule} from './dialog-routing.module';
import {SharedModule} from '../../shared/shared.module';
// Components
import {DialogOverviewComponent} from './component/overview/dialog-overview.component';
import {DialogApiComponent} from './component/api/dialog-api.component';
import {ClarityModule} from '@clr/angular';
import {BasicDialogComponent} from './component/basic-dialog/basic-dialog.component';
import {MultipleDialogComponent} from './component/multiple-dialog/multiple-dialog.component';
import {NoBackgroundDialogComponent} from './component/no-background-dialog/no-background-dialog.component';

@NgModule({
	imports: [
		SharedModule,
		ClarityModule,
		DialogRoutingModule
	],
	providers: [],
	declarations: [
		DialogOverviewComponent,
		DialogApiComponent,
		BasicDialogComponent,
		MultipleDialogComponent,
		NoBackgroundDialogComponent
	],
	exports: [
		DialogOverviewComponent,
		BasicDialogComponent,
		MultipleDialogComponent,
		NoBackgroundDialogComponent
	],
	entryComponents: [
		BasicDialogComponent,
		MultipleDialogComponent,
		NoBackgroundDialogComponent
	]
})
export class DialogModule {
}
