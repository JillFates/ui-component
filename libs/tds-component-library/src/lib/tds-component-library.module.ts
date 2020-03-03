import { PreventEscDirective } from './dialog/directive/prevent-esc.directive';
import { DialogDropdownComponent } from './dialog/component/dialog-dropdown/dialog-dropdown.component';
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Module
import { ClarityModule } from '@clr/angular';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule, RowFilterModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TdsFontawesomeModule } from './tds-fontawesome.module';
import { ResizableModule } from 'angular-resizable-element';
// Component
import { CardComponent } from './card/card.component';
import { ButtonComponent } from './button/button.component';
import { RadialProgressComponent } from './radial-progress/radial-progress.component';
import { GridPagerComponent } from './grid-pager/grid-pager.component';
import { TabScrollerModule } from './tab-scroller/tab-scroller.module';
import { DiagramLayoutComponent } from './diagram-layout/diagram-layout.component';
import { TdsContextMenuComponent } from './context-menu/tds-context-menu.component';
import { GridHeaderActionButtonsComponent } from './grid-header-action-buttons/grid-header-action-buttons.component';
import { GridRowDropdownComponent } from './grid-row-dropdown/grid-row-dropdown.component';
import { GridComponent } from './grid/grid.component';
import { DialogComponent } from './dialog/component/dialog/dialog.component';
import { DialogConfirmComponent } from './dialog/component/dialog-confirm/dialog-confirm.component';
import { DialogNotifyComponent } from './dialog/component/dialog-notify/dialog-notify.component';
import { GridFilterInputComponent } from './filter-input/grid-filter-input.component';
import { GridClearAllFiltersButtonComponent } from './grid-clear-all-filters-button/grid-clear-all-filters-button.component';
// Directive
import { DynamicHostComponent } from './dialog/component/dynamic-host/dynamic-host.component';
import { DynamicHostDirective } from './dialog/directive/dynamic-host.directive';
import { DraggableDirective } from './dialog/directive/draggable/draggable.directive';
import { GridShowHideFiltersButtonComponent } from './grid-show-hide-filters-button/grid-show-hide-filters-button.component';
import { GridSelectedItemsCounterComponent } from './grid-selected-items-counter/grid-selected-items-counter.component';
import { GridContextMenuFixedPositionDirective } from './grid-context-menu-fixed-position/grid-context-menu-fixed-position.directive';

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
		ResizableModule,
		TdsFontawesomeModule,
		RowFilterModule,
	],
	declarations: [
		CardComponent,
		ButtonComponent,
		DialogComponent,
		RadialProgressComponent,
		GridPagerComponent,
		DiagramLayoutComponent,
		TdsContextMenuComponent,
		GridFilterInputComponent,
		GridClearAllFiltersButtonComponent,
		GridShowHideFiltersButtonComponent,
		GridSelectedItemsCounterComponent,
		GridHeaderActionButtonsComponent,
		GridRowDropdownComponent,
		GridComponent,
		DynamicHostComponent,
		DialogConfirmComponent,
		DialogNotifyComponent,
		DialogDropdownComponent,
		// Directive
		DynamicHostDirective,
		DraggableDirective,
		PreventEscDirective,
		GridContextMenuFixedPositionDirective,
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
		GridFilterInputComponent,
		GridClearAllFiltersButtonComponent,
		GridShowHideFiltersButtonComponent,
		GridSelectedItemsCounterComponent,
		GridHeaderActionButtonsComponent,
		GridRowDropdownComponent,
		GridComponent,
		DynamicHostComponent,
		DialogConfirmComponent,
		DialogNotifyComponent,
		DialogDropdownComponent,
		// Directive
		DynamicHostDirective,
		DraggableDirective,
		PreventEscDirective,
		GridContextMenuFixedPositionDirective,
	],
	entryComponents: [DialogConfirmComponent, DialogNotifyComponent, DialogDropdownComponent],
})
export class TdsComponentLibraryModule {}
