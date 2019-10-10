import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClarityModule} from '@clr/angular';
import {GridModule} from '@progress/kendo-angular-grid';
import {CardComponent} from './card/card.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {ButtonComponent} from './button/button.component';
import {GridComponent} from './grid/grid.component';
import {ButtonsModule} from '@progress/kendo-angular-buttons';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		ButtonsModule,
		BrowserAnimationsModule,
		ClarityModule,
		GridModule
	],
	declarations: [
		CardComponent,
		DropdownComponent,
		ButtonComponent,
		GridComponent
	],
	exports: [
		CardComponent,
		DropdownComponent,
		ButtonComponent,
		GridComponent
	]
})
export class TdsComponentLibraryModule {
}
