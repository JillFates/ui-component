// Angular
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
// Model
import {RouteDataModel} from './model/route-data.model';
// RXjs
import {filter, map} from 'rxjs/operators';
import {SECTIONS} from './model/tab-section.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

	protected routeData: RouteDataModel = {
		title: '',
		url: []
	};
	public sectionTab = SECTIONS;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.routeData = {title: null, url: []};
		this.handleTransitions();
	}

	/**
	 * Listen to the Transitions
	 */
	private handleTransitions(): void {
		// Specific filter to get the information from the current Page of the latest request event
		this.router.events
			.pipe(
				filter((event: any) => event instanceof NavigationEnd),
				map(() => this.activatedRoute),
				map((route: any) => {
					while (route.firstChild) {
						route = route.firstChild;
					}
					return route;
				})
			).subscribe((event: any) => {
			// As soon as a transition start
			if (event.snapshot && Object.keys(event.snapshot.data).length) {
				this.routeData = event.snapshot.data;
				this.routeData.url = event.snapshot.url;
			}
		});
	}

	/**
	 * Navigate to the component
	 * @param tab
	 */
	routeTo(tab: SECTIONS.OVERVIEW | SECTIONS.API): void {
		if (this.routeData) {
			console.log(this.routeData);
			this.router.navigate(
				[
					`/component/${this.routeData.url[1]}/${tab}`
				]
			);
		}
	}
}
