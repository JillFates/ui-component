import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ClarityModule} from '@clr/angular';
import {GridModule} from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import {GridComponent} from './grid/grid.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		ClarityModule,
		GridModule,
		ButtonsModule
	],
	declarations: [
		GridComponent
	],
	exports: [
		GridComponent
	]
})
export class TdsComponentLibraryModule {
}
