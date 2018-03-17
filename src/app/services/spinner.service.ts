import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SpinnerService {

  private spinnerSubject: Subject<boolean> = new Subject();
  private spinnerObservable: Observable<boolean> = this.spinnerSubject.asObservable();

  subscribe(success, err?) {
    return this.spinnerObservable.subscribe(success, err);
  }

  setSpinner(newValue) {
    this.spinnerSubject.next(newValue);
  }

}
