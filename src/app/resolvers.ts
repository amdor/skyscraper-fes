import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from './reducers/index';
import {Store} from '@ngrx/store';
import {UserLoadedAction} from './actions';
import {AngularFireAuth} from '@angular/fire/auth';
import {take} from 'rxjs/operators';
import {User} from 'firebase/auth';

@Injectable()
export class GoogleAuthResolver implements Resolve<any> {
	constructor(private store: Store<AppState>, private authService: AngularFireAuth) {
	}

	resolve(route: ActivatedRouteSnapshot,
			state: RouterStateSnapshot): void {
		this.authService.authState.pipe(take(1)).subscribe((user?: User) => {
			this.store.dispatch(new UserLoadedAction(user));
		});
	}
}
