import {
	Component,
	ElementRef, EventEmitter,
	Input, OnChanges,
	OnInit, Output,
	Renderer2,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import {ITdsContextMenuModel} from './model/tds-context-menu.model';
import {FA_ICONS} from '../icons-constant/fontawesome-icons';

@Component({
	selector: 'tds-context-menu',
	template: `
		<div id="ctx-menu"
				 (contextmenu)="avoidDefault($event)"
				 #ctxMenu>
			<ul *ngIf="data">
				<li id="hold"
						*ngFor="let option of data.options.fields"
						[style.display]="option.hasPermission() && option.isAvailable(data.selectedNode) ? 'block' : 'none'">
					<button class="btn ctx-menu-btn clr-align-self-center" (click)="dispatchAction(option.event)">
						<div class="clr-row">
							<div class="clr-col-2 clr-align-self-center">
								<fa-icon [icon]="faIcons[option.icon.icon]"
												 [styles]="{ color: option.icon.color, float: 'left' }">
								</fa-icon>								
							</div>
							<div class="clr-col-10 clr-align-self-center">
								{{ option.label }}								
							</div>
						</div>
					</button>
				</li>
			</ul>
		</div>`,
	styleUrls: ['./tds-context-menu.component.scss']
})
export class TdsContextMenuComponent implements OnInit, OnChanges {
	@Input() data: ITdsContextMenuModel;
	@Output() actionDispatched: EventEmitter<any> = new EventEmitter();
	@ViewChild('ctxMenu', {static: false}) ctxMenu: ElementRef;
	faIcons = FA_ICONS;

	constructor(
		private renderer: Renderer2
	) {}

	/**
	 * On Init lifecycle hook
	 **/
	ngOnInit(): void {
		if (this.data && this.data.selectedNode) {
			this.open();
		}
	}

	/**
	 * Detect changes to update nodeData and linksPath accordingly
	 **/
	ngOnChanges(simpleChanges: SimpleChanges): void {
		if (simpleChanges && simpleChanges.data
			&& !(simpleChanges.data.firstChange)
		) {
			this.open();
		}
	}

	/**
	 * Show task detail context menu option
	 **/
	dispatchAction(action: string): void {
		this.hideCtxMenu();
		this.actionDispatched.emit({name: action, node: this.data.selectedNode});
	}

	/**
	 * Open context menu
	 **/
	open(): void {
		if (this.ctxMenu && this.ctxMenu.nativeElement) {
			this.renderer.setStyle(this.ctxMenu.nativeElement, 'display', 'block');
			this.renderer.setStyle(this.ctxMenu.nativeElement, 'left', `${this.data.mousePt.x}`);
			this.renderer.setStyle(this.ctxMenu.nativeElement, 'top', `${this.data.mousePt.y}`);
		}
	}

	/**
	 * Hide context menu
	 **/
	hideCtxMenu(): void {
		this.renderer.setStyle(this.ctxMenu.nativeElement, 'display', 'none');
	}

	/**
	 * prevent default behaviour when left clicking on a node
	 * so that a browser context menu is not triggered
	 **/
	avoidDefault(e: Event): boolean {
		e.preventDefault();
		return false;
	}
}
