// Angular
import {ComponentFactoryResolver, Injectable} from '@angular/core';
// Model
import {DialogEventType, DialogModel, ModalSize} from '../model/dialog.model';
// Component
import {DialogConfirmComponent} from '../component/dialog-confirm/dialog-confirm.component';
import {DialogNotifyComponent} from '../component/dialog-notify/dialog-notify.component';
// Other
import {Observable, Observer} from 'rxjs';
import {EventService} from '../../service/event-service/event.service';

@Injectable({
	providedIn: 'root'
})
export class DialogService {

	constructor(
		private eventService: EventService,
		private componentFactoryResolver: ComponentFactoryResolver) {
	}

	/**
	 * Broadcast an event to open a Dialog.
	 * @param dialogModel: DialogModel
	 */
	public open(dialogModel: DialogModel): Observable<any> {
		return new Observable((observer: Observer<any>) => {
			dialogModel.observable = observer;
			this.eventService.broadcast({
				name: DialogEventType.OPEN,
				event: dialogModel
			});
		});
	}

	/**
	 * Open a Confirmation Dialog that return CONFIRM or CANCEL
	 * @param title
	 * @param content
	 */
	public confirm(title: string, content: string): Observable<any> {
		return this.open({
			componentFactoryResolver: this.componentFactoryResolver,
			component: DialogConfirmComponent,
			data: null,
			content: content,
			modalConfiguration: {
				title: title,
				modalSize: ModalSize.CONFIRM
			}
		});
	}

	/**
	 * Open a Notification Dialog that return CONFIRM or CANCEL
	 * @param title
	 * @param content
	 */
	public notify(title: string, content: string): Observable<any> {
		return this.open({
			componentFactoryResolver: this.componentFactoryResolver,
			component: DialogNotifyComponent,
			data: null,
			content: content,
			modalConfiguration: {
				title: title,
				modalSize: ModalSize.CONFIRM
			}
		});
	}

}
