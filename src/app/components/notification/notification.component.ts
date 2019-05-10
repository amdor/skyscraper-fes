import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Subscription, timer} from 'rxjs';
import {NotificationPayload, NotificationType} from '../../types/notification';

@Component({
	selector: 'ssc-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnDestroy {
	private subscription: Subscription;
	displayedNotifications: NotificationPayload[] = [];
	notificationTypes = NotificationType;

	constructor(private notificationService: NotificationService, private cdRef: ChangeDetectorRef) {
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
