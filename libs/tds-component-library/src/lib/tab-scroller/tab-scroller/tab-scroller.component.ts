import { Component, QueryList, Input, AfterViewInit, ContentChildren, OnInit, ElementRef } from '@angular/core';
import { ScrollerLinkDirective } from '../scroller-link.directive';

@Component({
	selector: 'tds-tab-scroller',
	templateUrl: './tab-scroller.component.html',
	styleUrls: ['./tab-scroller.component.scss'],
})
export class TabScrollerComponent implements AfterViewInit {
	@Input() tabsLayout = 'horizontal';
	@ContentChildren(ScrollerLinkDirective, { descendants: true }) scrollerChildren!: QueryList<ScrollerLinkDirective>;
	constructor(private el: ElementRef) {
		//
	}

	ngAfterViewInit(): void {
		// Make sure that we can use multiple tab scroller components on the same page.
		// Get all of the TabScrollerComponents
		const tabScrollers = document.querySelectorAll('tds-tab-scroller');
		// Determine what item we are in the tab scroller, then select the proper tdsScrollContainer;
		let id = 0;
		tabScrollers.forEach((x, i) => {
			if (x === this.el.nativeElement) {
				id = i;
			}
		});

		const scrollContainers = document.querySelectorAll('[tdsscrollcontainer]');
		const scrollContainer = scrollContainers.item(id) as HTMLElement;

		const isRelativePosition = scrollContainer.style.position === 'relative';

		// Get the sections in the scroll container
		const sections = scrollContainer.querySelectorAll('[tdsscrollsection]');

		this.scrollerChildren.first.el.nativeElement.classList.add('active');

		this.scrollerChildren.forEach((item, i) => {
			const scrollToEl = sections[i] as HTMLElement;
			item.scrollTo = scrollToEl;
			item.tabsParent = this.el.nativeElement;
			item.scrollIn = scrollContainer;
			item.containerIsRelativePosition = isRelativePosition;
		});
	}
}
