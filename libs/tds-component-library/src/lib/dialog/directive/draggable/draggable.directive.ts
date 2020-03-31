import { Directive, Input, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
	selector: '[tdsDraggableDialog]',
})
export class DraggableDirective implements OnInit {
	private topStart: number;
	private leftStart: number;
	private _allowDrag = true;
	private md: boolean;
	private _handle: HTMLElement;

	constructor(public element: ElementRef) {}

	/**
	 * Attach the CSS classes
	 */
	ngOnInit(): void {
		if (this._allowDrag) {
			this.element.nativeElement.style.position = 'relative';
			this.element.nativeElement.className += ' cursor-draggable';
		}
	}

	/**
	 * Capture the MouseDown Event
	 * @param event
	 */
	@HostListener('mousedown', ['$event'])
	public onMouseDown(event: MouseEvent): void {
		if (event.button === 2 || (this._handle !== undefined && event.target !== this._handle)) {
			// prevents right click drag, remove his if you don't want it
			return;
		}
		this.md = true;
		this.topStart = event.clientY - this.element.nativeElement.style.top.replace('px', '');
		this.leftStart = event.clientX - this.element.nativeElement.style.left.replace('px', '');
	}

	/**
	 * Capture the Mouse Up Event
	 * @param event
	 */
	@HostListener('document:mouseup', ['$event'])
	onMouseUp(event: MouseEvent): void {
		this.md = false;
		this.highlightModal(true);
	}

	/**
	 * Capture the Mouse Move Event
	 * @param event
	 */
	@HostListener('document:mousemove', ['$event'])
	onMouseMove(event: MouseEvent): void {
		if (this.md && this._allowDrag) {
			this.highlightModal(false);
			this.element.nativeElement.style.top = event.clientY - this.topStart + 'px';
			this.element.nativeElement.style.left = event.clientX - this.leftStart + 'px';
		}
	}

	/**
	 * Capture the Mouse Leave Event
	 * @param event
	 */
	@HostListener('document:mouseleave', ['$event'])
	onMouseLeave(event: MouseEvent): void {
		this.md = false;
		this.highlightModal(true);
	}

	/**
	 * Capture the Touch Start Event
	 * @param event
	 */
	@HostListener('touchstart', ['$event'])
	onTouchStart(event: TouchEvent): void {
		this.md = true;
		this.topStart = event.changedTouches[0].clientY - this.element.nativeElement.style.top.replace('px', '');
		this.leftStart = event.changedTouches[0].clientX - this.element.nativeElement.style.left.replace('px', '');
		this.highlightModal(false);
		event.stopPropagation();
	}

	/**
	 * Capture the Touch End Event
	 * @param event
	 */
	@HostListener('document:touchend', ['$event'])
	onTouchEnd(event: TouchEvent): void {
		this.md = false;
		this.highlightModal(true);
	}

	/**
	 * Capture the Touch Move Event
	 * @param event
	 */
	@HostListener('document:touchmove', ['$event'])
	onTouchMove(event: TouchEvent): void {
		if (this.md && this._allowDrag) {
			this.highlightModal(false);
			this.element.nativeElement.style.top = event.changedTouches[0].clientY - this.topStart + 'px';
			this.element.nativeElement.style.left = event.changedTouches[0].clientX - this.leftStart + 'px';
		}
		event.stopPropagation();
	}

	@Input('draggable')
	set allowDrag(value: boolean) {
		this._allowDrag = value;
		if (this._allowDrag) {
			this.element.nativeElement.className += ' cursor-draggable';
		} else {
			this.element.nativeElement.className = this.element.nativeElement.className.replace(
				' cursor-draggable',
				''
			);
		}
	}

	@Input('draggableHandle')
	set draggableHandle(handle: HTMLElement) {
		this._handle = handle;
	}

	/**
	 * Enable or disable the Highlight
	 * @param enabled
	 */
	private highlightModal(enabled: boolean): void {
		if (!enabled) {
			document.body.classList.add('disabled-modal-selection');
		} else {
			document.body.classList.remove('disabled-modal-selection');
		}
	}
}
