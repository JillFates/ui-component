import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {ClarityModule} from '@clr/angular';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		ClarityModule,
		RouterModule.forRoot([], { initialNavigation: 'enabled' })
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
