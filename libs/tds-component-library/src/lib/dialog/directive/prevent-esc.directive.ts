import { DialogService } from './../service/dialog.service';
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
	selector: '[tdsPreventEsc]',
})
export class PreventEscDirective {
	constructor(private dialogService: DialogService, private elementRef: ElementRef) {}
	/**
	 * capture the click events and find selected target to prevent escape from executing
	 * **/
	@HostListener('document:click', ['$event'])
	public onClick(event: any): void {
		// console.log('this.elementRef.nativeElement.tagName:', this.elementRef.nativeElement.tagName);
		// console.log(
		// 	"this.elementRef.nativeElement.querySelector('CLR-DATEPICKER-VIEW-MANAGER'):",
		// 	this.elementRef.nativeElement.querySelector('CLR-DATEPICKER-VIEW-MANAGER')
		// );

		if (
			this.elementRef.nativeElement.querySelector('CLR-DATEPICKER-VIEW-MANAGER') ||
			this.elementRef.nativeElement.querySelector('KENDO-RESIZE-SENSOR')
		) {
			this.dialogService.activatedDropdown.next(true);
		} else {
			this.dialogService.activatedDropdown.next(false);
		}

		if (this.elementRef.nativeElement.querySelector('KENDO-RESIZE-SENSOR')) {
			console.log(this.elementRef.nativeElement.querySelector('.k-dropdown-wrap'));
			this.dialogService.activatedDropdown.next(true);
		}

		// if (event.target.tagName === 'SPAN') {
		// 	console.log('found span', event.target.attributes[0] === 'class');
		// }

		// if (event.target.tagName === 'CLR-ICON' || event.target.tagName === 'SELECT') {
		// 	if (
		// 		(event.target.parentNode.parentNode.childNodes[4] &&
		// 			event.target.parentNode.parentNode.childNodes[4].tagName === 'CLR-DATEPICKER-VIEW-MANAGER') ||
		// 		event.target.tagName === 'kendo-dropdownlist'
		// 	) {
		// 		this.dialogService.activatedDropdown.next(true);
		// 	} else {
		// 		this.dialogService.activatedDropdown.next(false);
		// 	}
		// } else {
		// 	this.dialogService.activatedDropdown.next(false);
		// }
	}
}
