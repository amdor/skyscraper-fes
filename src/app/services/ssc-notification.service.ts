import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';
import {NotificationPayload, NotificationType} from '../types/notification';


@Injectable()
export class SscNotificationService {

	private notificationSubject: Subject<NotificationPayload> = new Subject();
	private notificationObservable: Observable<NotificationPayload> = this.notificationSubject.asObservable();

	constructor(private translateService: TranslateService) {
	}

	subscribe(success, err?) {
		return this.notificationObservable.subscribe(success, err);
	}

	showNotification(type: NotificationType, msg: string = '') {
		if (msg) {
			this.translateService.get(msg).pipe(take(1)).subscribe((translated: string) => {
				this.notificationSubject.next({type, message: translated});
			});
		}
	}

}
