import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ClarityModule} from '@clr/angular';
import {GridModule} from '@progress/kendo-angular-grid';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ClarityModule,
		GridModule
	],
	declarations: [],
	exports: []
})
export class TdsComponentLibraryModule {
}
