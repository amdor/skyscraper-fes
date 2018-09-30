import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NotificationType} from '../components/ssc-notification/ssc-notification.component';

export interface NotificationPayload {
	type: NotificationType;
	message: string;
}

@Injectable()
export class SscNotificationService {

	private notificationSubject: Subject<NotificationPayload> = new Subject();
	private notificationObservable: Observable<NotificationPayload> = this.notificationSubject.asObservable();

	subscribe(success, err?) {
		return this.notificationObservable.subscribe(success, err);
	}

	showNotification(type: NotificationType, msg: string = '') {
		this.notificationSubject.next({type, message: msg});
	}

}
