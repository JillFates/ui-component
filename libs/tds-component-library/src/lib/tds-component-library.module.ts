import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ClarityModule} from '@clr/angular';
import {GridModule} from '@progress/kendo-angular-grid';
import {CardComponent} from './card/card.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {ButtonComponent} from './button/button.component';
import {GridComponent} from './grid/grid.component';
import {GridAllAssetsComponent} from './grid-all-assets/grid-all-assets.component';
import {ButtonsModule} from '@progress/kendo-angular-buttons';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		ButtonsModule,
		ClarityModule,
		GridModule
	],
	declarations: [
		GridComponent,
		GridAllAssetsComponent,
		CardComponent,
		DropdownComponent,
		ButtonComponent,
		GridComponent
	],
	exports: [
		CardComponent,
		DropdownComponent,
		ButtonComponent,
		GridComponent,
		GridAllAssetsComponent
	]
})
export class TdsComponentLibraryModule {
}
