import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, NO_ERRORS_SCHEMA, ViewChild} from '@angular/core';
import {TdsContextMenuComponent} from './tds-context-menu.component';
import {ITdsContextMenuModel} from './model/tds-context-menu.model';
import {ReplaySubject} from 'rxjs';
import {TdsFontawesomeModule} from '../tds-fontawesome.module';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

describe('Context Menu Tests', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let testComponent: TestHostComponent;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [TdsFontawesomeModule],
			declarations: [TestHostComponent, TdsContextMenuComponent],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
		console.error = jest.fn();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestHostComponent);
		testComponent = fixture.debugElement.componentInstance;
		console.error = jest.fn();
		fixture.detectChanges();
	});

	it('should contain data', async(() => {
		fixture.detectChanges();
		expect(testComponent).toBeDefined();
		testComponent.setData();
		fixture.detectChanges();
		expect(testComponent.tdsCtxMenu.data).toBeTruthy();
		expect(testComponent.tdsCtxMenu.data.options.fields).toHaveLength(1);
		expect(testComponent.tdsCtxMenu.data.options.fields[0]).toBeDefined();
		expect(testComponent.tdsCtxMenu.data.options.fields[0]).toHaveProperty('label');
	}));

	@Component({
		selector: 'tds-test-host-component',
		template: `<tds-context-menu [data]="data$ | async" #tdsCtxMenu></tds-context-menu>
		`
	})
	class TestHostComponent {
		private data$: ReplaySubject<ITdsContextMenuModel> = new ReplaySubject<ITdsContextMenuModel>();
		@ViewChild('tdsCtxMenu', {static: false}) tdsCtxMenu: TdsContextMenuComponent;

		constructor() {
			// TestHostcomponent constructor...
		}

		/**
		Dummy data for TestHostComponent
		 **/
		setData(): void {
			this.data$.next({
				selectedNode: {key: '123'},
				currentUser: 'user',
				mousePt: {x: '10px', y: '10px'},
				options: {
					containerComp: 'test',
					fields: [{
						label: 'test1',
						event: 'test-event',
						icon: {
							name: 'fa-folder',
							iconAlt: '',
							icon: 'fa-folder',
							color: '#ddd'
						},
						status: 'test',
						isAvailable: () => true,
						hasPermission: () => true
					}]
				}
			});
		}
	}
});