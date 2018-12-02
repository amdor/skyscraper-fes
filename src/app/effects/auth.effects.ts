import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {SIGN_IN, SIGN_OUT, SignInAction, SignInStatusChange} from './../actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {SscNotificationService} from '../services/ssc-notification.service';
import {NotificationType} from '../components/ssc-notification/ssc-notification.component';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthEffects {
	@Effect() signIn$: Observable<SignInStatusChange> = this.actions$.pipe(
		ofType(SIGN_IN),
		mergeMap((action: SignInAction) => {
			return from(this.authService.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
				.pipe(
					map((creds: firebase.auth.UserCredential) => new SignInStatusChange(creds.user, true)),
					catchError((err: any) => {
						return of(new SignInStatusChange(null, false));
					})
				);
		})
	);

	@Effect() signOut$: Observable<SignInStatusChange | any> = this.actions$.pipe(
		ofType(SIGN_OUT),
		map((action: SignInAction) => {
			return this.authService.auth.signOut();
		}),
		map(() => new SignInStatusChange(null, false)),
		catchError((err: any) => {
			this.notificationService.showNotification(NotificationType.FAILURE, err.toString());
			return err;
		})
	);

	constructor(private actions$: Actions, private authService: AngularFireAuth, private notificationService: SscNotificationService) {
	}
}
