import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {NotificationType} from '../components/ssc-notification/ssc-notification.component';

@Injectable()
export class SscNotificationService {

	private notificationSubject: Subject<NotificationType> = new Subject();
	private notificationObservable: Observable<NotificationType> = this.notificationSubject.asObservable();

	subscribe(success, err?) {
		return this.notificationObservable.subscribe(success, err);
	}

	showNotification(newValue: NotificationType) {
		this.notificationSubject.next(newValue);
	}

}