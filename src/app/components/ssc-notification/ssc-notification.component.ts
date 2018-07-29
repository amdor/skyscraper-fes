import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {SscNotificationService} from '../../services/ssc-notification.service';
import {Subscription, Observable} from 'rxjs';


export enum NotificationType {
	SUCCESS = 'alert-success'
}

@Component({
	selector: 'ssc-notification',
	templateUrl: './ssc-notification.component.html',
	styleUrls: ['./ssc-notification.component.scss']
})
export class SscNotificationComponent implements OnDestroy {
	private subscription: Subscription;
	displayedNotifications: NotificationType[] = [];
	notificationTypes = NotificationType;

	constructor(private notificationService: SscNotificationService, private cdRef: ChangeDetectorRef) {
		this.subscription = notificationService.subscribe((type) => {
			this.popupNotification(type);
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private popupNotification(type: NotificationType) {
		this.displayedNotifications.push(type);
		this.cdRef.detectChanges();
		Observable.timer(2000).subscribe(() => {
			this.displayedNotifications.splice(this.displayedNotifications.indexOf(type), 1);
			this.cdRef.detectChanges();
		});
	}
}
