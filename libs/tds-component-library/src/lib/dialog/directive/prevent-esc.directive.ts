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
		const kDropdownClasses = ['k-dropdown-wrap', 'k-state-default'];
		const calendarDropdownClasses = ['day-btn', 'is-today', 'k-calendar', 'k-calendar-infinite'];
		const bannedClasses = [...calendarDropdownClasses, ...kDropdownClasses];
		const elementClickedOn = document.activeElement;
		console.log('elementClickedOn: ', elementClickedOn);
		console.log('elementClickedOn.classList: ', elementClickedOn.classList);
		const classList = elementClickedOn && elementClickedOn.classList;
		console.log('classList: ', classList);

		if (elementClickedOn && classList) {
			// check if one of the class list elements is equal to some banned class
			const belongsToBannedClass = (() => { 
				let isBanned = false;
				for (let i = 0; i < classList.length; ++i) {
					if (bannedClasses.indexOf(classList.item(i)) !== -1) {
						isBanned = true;
						break;
					}
				}
				return isBanned;
			})();
	
			// from here we need to identify where to capture this emission changes.
			if (belongsToBannedClass) {
				console.log('this element should PREVENT escape of this dialog.');
				// emit activated dropdown to true
				this.dialogService.activatedDropdown.next(true);
				console.log('emitted activatedDropdown to true');
			} else {
				// emit activated dropdown to false, because user clicked on non-affected element.
				this.dialogService.activatedDropdown.next(false);
				console.log('emitted activatedDropdown to false');
			}

		} // else {
		// 	console.log('Invalid or undefined classList or element');
		// }

		// console.log('this.elementRef.nativeElement.tagName:', this.elementRef.nativeElement.tagName);
		// console.log(
		// 	"this.elementRef.nativeElement.querySelector('CLR-DATEPICKER-VIEW-MANAGER'):",
		// 	this.elementRef.nativeElement.querySelector('CLR-DATEPICKER-VIEW-MANAGER')
		// );

		// new cut
		// if (
		// 	this.elementRef.nativeElement.querySelector('CLR-DATEPICKER-VIEW-MANAGER') ||
		// 	this.elementRef.nativeElement.querySelector('KENDO-RESIZE-SENSOR')
		// ) {
		// 	this.dialogService.activatedDropdown.next(true);
		// } else {
		// 	this.dialogService.activatedDropdown.next(false);
		// }

		// if (this.elementRef.nativeElement.querySelector('KENDO-RESIZE-SENSOR')) {
		// 	console.log(this.elementRef.nativeElement.querySelector('.k-dropdown-wrap'));
		// 	this.dialogService.activatedDropdown.next(true);
		// }
		// end of new cut

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
