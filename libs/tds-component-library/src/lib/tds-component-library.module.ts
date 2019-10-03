import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ClarityModule} from '@clr/angular';
import {GridModule} from '@progress/kendo-angular-grid';
import {DropdownComponent} from './dropdown/dropdown.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ClarityModule,
		GridModule
	],
	declarations: [
		DropdownComponent
	],
	exports: [
		DropdownComponent
	]
})
export class TdsComponentLibraryModule {}
