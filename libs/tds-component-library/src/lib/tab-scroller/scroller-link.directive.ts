import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[tdsScrollerLink]',
})
export class ScrollerLinkDirective {
	// TODO: Make sure this works.
	@Input() scrollTo: HTMLElement;
	@Input() scrollIn: HTMLElement;
	@Input() tabsParent: HTMLElement;
	@Input() containerIsRelativePosition = false;

	/**
	 * Click Event For Host Listener
	 */
	@HostListener('click')
	onClick(): void {
		// Remove the active class from the current active tab
		const tabs = this.tabsParent.getElementsByClassName('btn btn-link nav-link');

		// Ensure that the active class is removed from all tabs.
		for (let index = 0; index < tabs.length; index++) {
			const element = tabs[index];
			element.classList.remove('active');
		}

		// Add the active class to the clicked tab
		this.el.nativeElement.classList.add('active');

		// If the parent element of the scrollTo element is scrollable, scroll the parent element, otherwise, scroll the entire page
		if (this.scrollIn.scrollHeight > this.scrollIn.clientHeight && this.containerIsRelativePosition) {
			this.scrollIn.scrollTop = this.scrollTo.offsetTop;
			return;
		} else if (this.scrollIn.scrollHeight > this.scrollIn.clientHeight) {
			this.scrollIn.scrollTop = this.scrollTo.offsetTop - this.scrollIn.offsetTop;
			return;
		} else {
			this.scrollTo.scrollIntoView();
			return;
		}
	}

	constructor(public el: ElementRef) {
		// Add the necessary clarity classes to the element
		this.el.nativeElement.classList.add('btn', 'btn-link', 'nav-link');
	}
}
