// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Clarity
import { ClarityModule } from '@clr/angular';

// Kendo
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

// TDS Component Library
import { CardComponent } from './card/card.component';
import { ButtonComponent } from './button/button.component';
import { RadialProgressComponent } from './radial-progress/radial-progress.component';
import { GridPagerComponent } from './grid-pager/grid-pager.component';
import { TabScrollerModule } from './tab-scroller/tab-scroller.module';
import { DiagramLayoutComponent } from './diagram-layout/diagram-layout.component';
import { TdsFontawesomeModule } from './tds-fontawesome.module';
import { TdsContextMenuComponent } from './context-menu/tds-context-menu.component';
import { GridHeaderActionButtonsComponent } from './grid-header-action-buttons/grid-header-action-buttons.component';
import { GridRowDropdownComponent } from './grid-row-dropdown/grid-row-dropdown.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		ButtonsModule,
		GridModule,
		DateInputsModule,
		DropDownsModule,
		ClarityModule,
		TdsFontawesomeModule,
	],
	declarations: [
		CardComponent,
		ButtonComponent,
		RadialProgressComponent,
		GridPagerComponent,
		DiagramLayoutComponent,
		TdsContextMenuComponent,
		GridHeaderActionButtonsComponent,
		GridRowDropdownComponent,
		GridComponent,
	],
	exports: [
		CardComponent,
		ButtonComponent,
		RadialProgressComponent,
		GridPagerComponent,
		TabScrollerModule,
		DiagramLayoutComponent,
		TdsContextMenuComponent,
		GridHeaderActionButtonsComponent,
		GridRowDropdownComponent,
		GridComponent,
	],
})
export class TdsComponentLibraryModule {}
