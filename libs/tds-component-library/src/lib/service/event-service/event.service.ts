// Angular
import {Injectable} from '@angular/core';
// Model
import {EventModel} from './model/event.model';
// Other
import {Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class EventService {
	private subject: Subject<any> = new Subject();

	/**
	 * Broadcasts an event.
	 * @param event: any
	 */
	broadcast(event: EventModel): void {
		this.subject.next(event);
	}

	/**
	 * On Event broadcast, subscribe the callback.
	 * @param eventName: string
	 * @param callback: any
	 */
	on(eventName: string, callback: any): any {
		const subscription: any = this.subject.pipe(
			filter((value: any) => value.name === eventName)
		).subscribe(callback);
		return (): void => {
			subscription.remove(subscription);
			subscription.unsubscribe();
		};
	}
}
