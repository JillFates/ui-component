import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ClrDropdown } from '@clr/angular';

@Directive({
	selector: '[tdsGridContextMenuFixedPosition]',
})
export class GridContextMenuFixedPositionDirective implements OnInit {

	@Input() clrDropdown: ClrDropdown;

	constructor(private el: ElementRef, private renderer: Renderer2) {
		// Silence is golden.
	}

	ngOnInit(): void {
		if (this.clrDropdown) {
			this.clrDropdown.ifOpenService.openChange.subscribe((isOpen: boolean) => {
				if (isOpen && this.clrDropdown.ifOpenService.originalEvent) {
					this.showMenu(this.clrDropdown.ifOpenService.originalEvent);
				}
			});
		}
	}

	/**
	 * Calculate & Displays the context menu in the correct fixed position.
	 * @param $mouseEvent
	 */
	showMenu($mouseEvent: any): void {
		if (this.clrDropdown.ifOpenService.open && (this.clrDropdown as any).cdr.rootNodes) {
			let dropdownToggle: any;
			let dropdownMenu: any;
			(this.clrDropdown as any).cdr.rootNodes.forEach( item => {
				if (item.classList && item.classList.contains('dropdown-toggle')) {
					dropdownToggle = item;
				} else if (item.localName === 'clr-dropdown-menu') {
					dropdownMenu = item;
				}
			});
			if (dropdownToggle && dropdownMenu) {
				this.renderer.setStyle(dropdownMenu, 'display', 'none');
				setTimeout(() => {
					this.renderer.setStyle(dropdownMenu, 'position', 'fixed');
					this.renderer.setStyle(dropdownMenu, 'top', `${$mouseEvent.clientY + dropdownToggle.offsetHeight - 20}px`);
					this.renderer.setStyle(dropdownMenu, 'left', `${$mouseEvent.clientX - 10}px`);
					this.renderer.setStyle(dropdownMenu, 'transform', 'none');
					this.renderer.setStyle(dropdownMenu, 'display', 'block');
				});
			}
		}
	}
}
