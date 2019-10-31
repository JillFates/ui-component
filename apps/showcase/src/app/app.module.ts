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
// Component
import { AppComponent } from './app.component';
import {DiagramLayoutModule} from './modules/diagram-layout/diagram-layout.module';

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
		RadialProgressModule,
		ButtonModule,
		TabsModule,
		DiagramLayoutModule,
		RouterModule.forRoot([], { initialNavigation: 'enabled' }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
