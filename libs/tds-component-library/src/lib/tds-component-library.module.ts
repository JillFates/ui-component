import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { GridModule } from '@progress/kendo-angular-grid';
import { CardComponent } from './card/card.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
	imports: [CommonModule, RouterModule, BrowserAnimationsModule, ClarityModule, GridModule],
	declarations: [CardComponent, DropdownComponent, ButtonComponent],
	exports: [CardComponent, DropdownComponent, ButtonComponent],
})
export class TdsComponentLibraryModule {}
