// Angular
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
// Module
import {ClarityModule} from '@clr/angular';
import {GridModule} from './modules/grid/grid.module';
// Component
import {AppComponent} from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
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
