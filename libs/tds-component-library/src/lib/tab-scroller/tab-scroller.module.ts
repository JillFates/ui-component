import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabScrollerComponent } from './tab-scroller/tab-scroller.component';
import { ScrollerItemComponent } from './scroller-item/scroller-item.component';
import { ScrollerLinkDirective } from './scroller-link.directive';
import { ScrollSectionDirective } from './scroll-section.directive';
import { ScrollContainerDirective } from './scroll-container.directive';

@NgModule({
	declarations: [
		TabScrollerComponent,
		ScrollerItemComponent,
		ScrollerLinkDirective,
		ScrollSectionDirective,
		ScrollContainerDirective
	],
	imports: [
		CommonModule
	],
	exports: [
		TabScrollerComponent,
		ScrollerItemComponent,
		ScrollerLinkDirective
	]
})
export class TabScrollerModule { }
