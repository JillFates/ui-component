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
import {ThirdLayerDialogComponent} from './component/third-layer/third-layer-dialog.component';
import {NoBackgroundDialogComponent} from './component/no-background-dialog/no-background-dialog.component';
import {FourthLayerDialogComponent} from './component/fourth-layer/fourth-layer-dialog.component';
import {ButtonActionContextDialogComponent} from './component/button-action-context-dialog/button-action-context-dialog.component';
import {ButtonActionDialogComponent} from './component/button-action-dialog/button-action-dialog.component';
import {ButtonContextDialogComponent} from './component/button-context-dialog/button-context-dialog.component';

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
		ThirdLayerDialogComponent,
		FourthLayerDialogComponent,
		NoBackgroundDialogComponent,
		ButtonActionDialogComponent,
		ButtonContextDialogComponent,
		ButtonActionContextDialogComponent
	],
	exports: [
		DialogOverviewComponent,
		BasicDialogComponent,
		MultipleDialogComponent,
		ThirdLayerDialogComponent,
		FourthLayerDialogComponent,
		NoBackgroundDialogComponent,
		ButtonActionDialogComponent,
		ButtonContextDialogComponent,
		ButtonActionContextDialogComponent
	],
	entryComponents: [
		BasicDialogComponent,
		MultipleDialogComponent,
		ThirdLayerDialogComponent,
		FourthLayerDialogComponent,
		NoBackgroundDialogComponent,
		ButtonActionDialogComponent,
		ButtonContextDialogComponent,
		ButtonActionContextDialogComponent
	]
})
export class DialogModule {
}
