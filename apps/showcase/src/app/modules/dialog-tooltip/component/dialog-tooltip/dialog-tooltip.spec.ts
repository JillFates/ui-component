import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogApiComponent } from './../../../dialog/component/api/dialog-api.component';
import { DialogOverviewComponent } from './../../../dialog/component/overview/dialog-overview.component';
import { SharedModule } from './../../../../shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { DialogRoutingModule } from './../../../dialog/dialog-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogTooltipComponent } from './dialog-tooltip.component';
import { TestBed, async } from '@angular/core/testing';

describe('DialogTooltipComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DialogTooltipComponent, DialogOverviewComponent, DialogApiComponent],
			imports: [SharedModule, ClarityModule, DialogRoutingModule, ReactiveFormsModule, BrowserAnimationsModule],
		}).compileComponents();
	}));
	it('should create the Dialog Tooltip Component', () => {
		const fixture = TestBed.createComponent(DialogTooltipComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
	it('4 buttons should be loaded', () => {
		const fixture = TestBed.createComponent(DialogTooltipComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		const app = fixture.componentInstance;
		expect(app.buttons.length).toEqual(4);
	});

	it('Close button should show when form is not touched', () => {
		const fixture = TestBed.createComponent(DialogTooltipComponent);
		fixture.detectChanges();
		const app = fixture.componentInstance;
		expect(() => app.buttons[3].show).toBeTruthy();
	});
});
