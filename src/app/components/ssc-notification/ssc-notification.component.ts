import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {NotificationPayload, SscNotificationService} from '../../services/ssc-notification.service';
import {Subscription, timer} from 'rxjs';


export enum NotificationType {
	SUCCESS = 'alert-success',
	FAILURE = 'alert-fail'
}

@Component({
	selector: 'ssc-notification',
	templateUrl: './ssc-notification.component.html',
	styleUrls: ['./ssc-notification.component.scss']
})
export class SscNotificationComponent implements OnDestroy {
	private subscription: Subscription;
	displayedNotifications: NotificationPayload[] = [];
	notificationTypes = NotificationType;

	constructor(private notificationService: SscNotificationService, private cdRef: ChangeDetectorRef) {
		this.subscription = notificationService.subscribe((notification: NotificationPayload) => {
			this.popupNotification(notification);
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private popupNotification(notification: NotificationPayload) {
		this.displayedNotifications.push(notification);
		this.cdRef.detectChanges();
		timer(2000).subscribe(() => {
			this.displayedNotifications.splice(this.displayedNotifications.indexOf(notification), 1);
			this.cdRef.detectChanges();
		});
	}
}
