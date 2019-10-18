import { Component, Input } from '@angular/core';

@Component({
	selector: 'tds-radial-progress',
	styleUrls: ['./radial-progress.component.scss'],
	templateUrl: './radial-progress.component.html',
})
export class RadialProgressComponent {
	private dasharray: number;
	private dashoffset: number;
	private radius = 33;

	@Input() size: string;
	@Input('percent')
	set percent(p: any) {
		this.dasharray = 2 * Math.PI * this.radius;
		const progress = parseFloat(p) / 100;

		this.dashoffset = this.dasharray * (1 - progress);
	}

	/**
	 * Calculate class array for component
	 */
	public radialProgressClass(): string[] {
		const result: string[] = ['tds-radial-progress'];
		switch (this.size) {
			case 'small':
				result.push('small');
				break;

			case 'medium':
				result.push('medium');
				break;

			case 'large':
				result.push('large');
				break;

			default:
				break;
		}

		return result;
	}
}
