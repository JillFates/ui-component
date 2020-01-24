// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
// Module
import {ClarityModule} from '@clr/angular';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {GridModule} from '@progress/kendo-angular-grid';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {TdsFontawesomeModule} from './tds-fontawesome.module';
// TDS Component Library
// Component
import {CardComponent} from './card/card.component';
import {ButtonComponent} from './button/button.component';
import {RadialProgressComponent} from './radial-progress/radial-progress.component';
import {GridPagerComponent} from './grid-pager/grid-pager.component';
import {TabScrollerModule} from './tab-scroller/tab-scroller.module';
import {DiagramLayoutComponent} from './diagram-layout/diagram-layout.component';
import {TdsContextMenuComponent} from './context-menu/tds-context-menu.component';
import {GridHeaderActionButtonsComponent} from './grid-header-action-buttons/grid-header-action-buttons.component';
import {GridRowDropdownComponent} from './grid-row-dropdown/grid-row-dropdown.component';
import {GridComponent} from './grid/grid.component';
import {DialogComponent} from './dialog/component/dialog/dialog.component';
// Directive
import {DynamicHostComponent} from './dialog/component/dynamic-host/dynamic-host.component';
import {DynamicHostDirective} from './dialog/directive/dynamic-host.directive';

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
		DialogComponent,
		RadialProgressComponent,
		GridPagerComponent,
		DiagramLayoutComponent,
		TdsContextMenuComponent,
		GridHeaderActionButtonsComponent,
		GridRowDropdownComponent,
		GridComponent,
		DynamicHostComponent,
		// Directive
		DynamicHostDirective
	],
	exports: [
		CardComponent,
		ButtonComponent,
		DialogComponent,
		RadialProgressComponent,
		GridPagerComponent,
		TabScrollerModule,
		DiagramLayoutComponent,
		TdsContextMenuComponent,
		GridHeaderActionButtonsComponent,
		GridRowDropdownComponent,
		GridComponent,
		DynamicHostComponent,
		// Directive
		DynamicHostDirective
	],
})
export class TdsComponentLibraryModule {
}
