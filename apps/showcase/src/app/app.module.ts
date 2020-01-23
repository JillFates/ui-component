// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Module
import { ClarityModule } from '@clr/angular';
import { KendoGridModule } from './modules/kendo-grid/kendo-grid.module';
import { DropdownModule } from './modules/dropdown/dropdown.module';
import { ButtonModule } from './modules/button/button.module';
import { SharedModule } from './shared/shared.module';
import { RadialProgressModule } from './modules/radial-progress/radial-progress.module';
import { TabsModule } from './modules/tabs/tabs.module';
import { TabScrollerModule } from './modules/tabs-scroller/tab-scroller.module';
import { ComboboxModule } from './modules/combobox/combobox.module';
import { MultiselectModule } from './modules/multiselect/multiselect.module';
import { GridHeaderModule } from './modules/grid-header/grid-header.module';
import { GridInternalModule } from './modules/grid-internal/grid-internal.module';
import { GridModule } from './modules/grid/grid.module';

// Component
import { AppComponent } from './app.component';
import { DiagramLayoutModule } from './modules/diagram-layout/diagram-layout.module';
import {DialogModule} from './modules/dialog/dialog.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		SharedModule.forRoot(),
		BrowserModule,
		BrowserAnimationsModule,
		ClarityModule,
		// Showcase Component
		KendoGridModule,
		DropdownModule,
		ComboboxModule,
		MultiselectModule,
		RadialProgressModule,
		ButtonModule,
		TabsModule,
		TabScrollerModule,
		DiagramLayoutModule,
		GridHeaderModule,
		GridInternalModule,
		GridModule,
		DialogModule,
		RouterModule.forRoot(
			[
				{
					path: '',
					redirectTo: '/component/dropdown/overview',
					pathMatch: 'full',
				},
			],
			{ initialNavigation: 'enabled' }
		),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
