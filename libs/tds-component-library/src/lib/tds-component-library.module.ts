import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClarityModule} from '@clr/angular';
import {CardComponent} from './card/card.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {ButtonComponent} from './button/button.component';
import {GridAllAssetsComponent} from './grid-all-assets/grid-all-assets.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		BrowserAnimationsModule,
		ClarityModule
	],
	declarations: [
		GridAllAssetsComponent,
		CardComponent,
		DropdownComponent,
		ButtonComponent
	],
	exports: [
		CardComponent,
		DropdownComponent,
		ButtonComponent,
		GridAllAssetsComponent
	]
})
export class TdsComponentLibraryModule {
}
