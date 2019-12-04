import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { CardComponent } from './card/card.component';
import { ButtonComponent } from './button/button.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { RadialProgressComponent } from './radial-progress/radial-progress.component';
import { GridPagerComponent } from './grid-pager/grid-pager.component';
import { TabScrollerModule } from './tab-scroller/tab-scroller.module';
import { DiagramLayoutComponent } from './diagram-layout/diagram-layout.component';
import { TdsFontawesomeModule } from './tds-fontawesome.module';
import { TdsContextMenuComponent } from './context-menu/tds-context-menu.component';
import { GridHeaderActionButtonsComponent } from './grid-header-action-buttons/grid-header-action-buttons.component';
import { GridRowDropdownComponent } from './grid-row-dropdown/grid-row-dropdown.component';

@NgModule({
	imports: [CommonModule, FormsModule, RouterModule, ButtonsModule, ClarityModule, TdsFontawesomeModule],
	declarations: [
		CardComponent,
		ButtonComponent,
		RadialProgressComponent,
		GridPagerComponent,
		DiagramLayoutComponent,
		TdsContextMenuComponent,
		GridHeaderActionButtonsComponent,
		GridRowDropdownComponent,
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
	],
})
export class TdsComponentLibraryModule {}
