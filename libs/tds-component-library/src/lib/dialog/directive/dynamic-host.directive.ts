/**
 * Place holder to use dynamically inject dialog component on runtime
 */
import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
	selector: '[tdsDynamicDialog]',
})
export class DynamicHostDirective {
	constructor(public viewContainerRef: ViewContainerRef) {
	}
}
