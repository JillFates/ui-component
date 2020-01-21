// Angular
import {Injectable} from '@angular/core';
// Model
import {DialogEventType, DialogModel} from '../model/dialog.model';
// Other
import {Observable, Observer} from 'rxjs';
import {EventService} from '../../service/event-service/event.service';

@Injectable({
	providedIn: 'root'
})
export class DialogService {

	constructor(private eventService: EventService) {
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

}
