import { Component } from '@angular/core';

@Component({
	selector: 'app-radial-progress-overview',
	templateUrl: './radial-progress-overview.component.html',
	styleUrls: ['./radial-progress-overview.component.css'],
})
export class RadialProgressOverviewComponent {
	public value: number;
	constructor() {
		this.value = 0;
		setInterval(x => {
			this.value += 10;
			if (this.value > 100) {
				this.value = 0;
			}
		}, 500);
	}
}
