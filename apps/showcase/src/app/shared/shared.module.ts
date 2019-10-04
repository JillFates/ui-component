import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GridModule} from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
	imports: [
		ButtonsModule
	],
	declarations: [],
	exports: [
		// Third Party Modules
		CommonModule,
		FormsModule,
		GridModule,
		ButtonsModule
	],
	entryComponents: []
})
export class SharedModule {
	/**
	 * forRoot
	 */
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
		};
	}
}
