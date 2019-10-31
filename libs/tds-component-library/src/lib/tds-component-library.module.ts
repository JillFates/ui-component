import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { CardComponent } from './card/card.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonComponent } from './button/button.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { RadialProgressComponent } from './radial-progress/radial-progress.component';
import { GridPagerComponent } from './grid-pager/grid-pager.component';
import { TabScrollerModule } from './tab-scroller/tab-scroller.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		ButtonsModule,
		ClarityModule
	],
	declarations: [
		CardComponent,
		DropdownComponent,
		ButtonComponent,
		RadialProgressComponent,
		GridPagerComponent,
	],
	exports: [
		CardComponent,
		DropdownComponent,
		ButtonComponent,
		RadialProgressComponent,
		GridPagerComponent,
		TabScrollerModule
	]
})
export class TdsComponentLibraryModule {
}
