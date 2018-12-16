import {Actions, Effect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import {CAR_DATA_FAIL, CAR_DATA_SUCCESS, CarDataFailAction, CarDataSuccessAction} from '../actions';
import {Injectable} from '@angular/core';
import {SscNotificationService} from '../services/ssc-notification.service';
import {NotificationType} from '../types/notification';

@Injectable()
export class NotificationEffect {
	@Effect({dispatch: false}) getCarDataSuccess$ = this.actions$.pipe(
		ofType(CAR_DATA_SUCCESS),
		tap((action: CarDataSuccessAction) => {
			this.notificationService.showNotification(NotificationType.SUCCESS, action.msg);
		}));

	@Effect({dispatch: false}) getCarDataFail$ = this.actions$.pipe(
		ofType(CAR_DATA_FAIL),
		tap((action: CarDataFailAction) => {
			this.notificationService.showNotification(NotificationType.FAILURE, action.msg);
		}));

	constructor(private actions$: Actions, private notificationService: SscNotificationService) {

	}
}
