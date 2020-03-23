import { Directive, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
	selector: '[tdsFindInput]',
})
export class FindInputDirective implements OnInit, AfterViewInit {
	constructor(private elRef: ElementRef, private renderer: Renderer2) { }
	ngOnInit(): void {
		// mark the host element as focusable
		this.renderer.setAttribute(this.elRef.nativeElement, 'tabindex', '0');
		// disable the border focus
		this.renderer.setStyle(this.elRef.nativeElement, 'outline-width', 0);
	}
	ngAfterViewInit(): void {
		// we need to delay because the bootstrap effect displaying modals
		setTimeout(() => this.elRef.nativeElement.focus(), 1000);
	}
}
