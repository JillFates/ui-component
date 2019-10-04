// Angular
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Module
import {ClarityModule} from '@clr/angular';
import {GridModule} from './modules/grid/grid.module';
import {SharedModule} from './shared/shared.module';
// Component
import {AppComponent} from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		SharedModule.forRoot(),
		BrowserModule,
		BrowserAnimationsModule,
		ClarityModule,
		// Showcase Component
		GridModule,
		RouterModule.forRoot([], {initialNavigation: 'enabled'})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
