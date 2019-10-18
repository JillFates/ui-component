import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { CardComponent } from './card/card.component';
import { RadialProgressComponent } from './radial-progress/radial-progress.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
	imports: [CommonModule, FormsModule, RouterModule, BrowserAnimationsModule, ClarityModule],
	declarations: [CardComponent, DropdownComponent, ButtonComponent, RadialProgressComponent],
	exports: [CardComponent, DropdownComponent, ButtonComponent, RadialProgressComponent],
})
export class TdsComponentLibraryModule {}
