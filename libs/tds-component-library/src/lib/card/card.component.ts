import { Component, Input } from '@angular/core';

@Component({
	selector: 'tds-card',
	template: `
		<div class="card">
			<div class="card-block card-item">
				<h4 *ngIf="title" class="card-title">{{ title }}</h4>
				<p *ngIf="description" class="card-text">{{ description }}</p>
				<div class="card-text">
					<ng-content></ng-content>
				</div>
				<div *ngIf="code" class="card-text example-code">
					<pre class="codebox"><code class="codeblock">{{ code.trim() }}</code></pre>
				</div>
			</div>
		</div>
	`,
})
export class CardComponent {
	@Input() title: string;
	@Input() description: string;
	@Input() code: string;
}
