import { SharedModule } from './../../../../shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogTooltipComponent } from './dialog-tooltip.component';
import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('DialogTooltipComponent', () => {
	let fixture: ComponentFixture<DialogTooltipComponent>;
	let comp: DialogTooltipComponent;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DialogTooltipComponent],
			imports: [SharedModule, ClarityModule, ReactiveFormsModule, BrowserAnimationsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogTooltipComponent);
		comp = fixture.debugElement.componentInstance;
		fixture.detectChanges();
	});

	it('should create the Dialog Tooltip Component', () => {
		expect(comp).toBeTruthy();
	});

	it('4 buttons should be loaded', () => {
		fixture.detectChanges();
		expect(comp.buttons.length).toBeGreaterThanOrEqual(4);
	});

	it('Close button should show when form is not touched', () => {
		fixture.detectChanges();
		expect(() => comp.buttons[3].show).toBeTruthy();
	});
});
