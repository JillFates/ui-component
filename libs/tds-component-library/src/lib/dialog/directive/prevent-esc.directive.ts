import { DialogService } from './../service/dialog.service';
import { Directive, ElementRef, OnInit, HostListener, HostBinding, Host, ViewChildren, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
	selector: '[tdsPreventEsc]',
})
export class PreventEscDirective {
	isDropped = false;

	constructor(private elementReference: ElementRef, private dialogService: DialogService) {}
	/**
	 * capture the click events
	 * **/
	@HostListener('document:click', ['$event'])
	public onClick(event: any): void {
		this.dialogService.activatedDropdown.next(true);
	}

	/**
	 * capture the click events
	 * **/
	// @HostListener('focus', ['$event']) toggleDroppedOn(): void {
	// 	this.isDropped = true;
	// 	console.log('focused:', this.isDropped);
	// }

	/**
	 * capture the click events
	 * **/
	// @HostListener('focusout', ['$event']) toggleDroppedOff(): void {
	// 	this.isDropped = false;
	// 	console.log('outfocus:', this.isDropped);
	// }
}
