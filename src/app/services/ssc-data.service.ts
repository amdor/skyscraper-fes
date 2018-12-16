import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference, DocumentData} from '@angular/fire/firestore';
import {environment} from '../../environments/environment';
import {User} from 'firebase';
import {from, Observable} from 'rxjs';
import {CarData} from '../types/car-dto';
import {map, mergeMap, take} from 'rxjs/operators';
import {AngularFirestoreCollection} from '@angular/fire/firestore/collection/collection';
import {SscUser} from '../types/ssc-user-dto';


@Injectable()
export class SscDataService {
	constructor(private afs: AngularFirestore) {
	}

	public getUserCarGroup(user: User): Observable<any> {
		return this.afs.collection(environment.userCollection).doc(user.uid).valueChanges();
	}

	public getSavedCarDataByCarGroup(carGroup: number): Observable<any> {
		return this.getSavedCarDataCollection(carGroup).valueChanges();
	}

	public saveCarDataByCarGroup(carGroup: number, carData: CarData[]): Observable<void> {
		return this.getSavedCarDataCollection(carGroup).snapshotChanges().pipe(
			// collect ids
			map(actions => actions.map(a => {
				const data = a.payload.doc.data();
				const id = a.payload.doc.id;
				return {id, ...data};
			})),
			take(1),
			mergeMap((savedCarData: any[]) => {
				// delete all old
				const batchDelete = this.afs.firestore.batch();
				for (const savedCar of savedCarData) {
					const docRef = this.afs.collection(environment.carDataCollection).doc(savedCar.id).ref;
					batchDelete.delete(docRef);
				}
				return from(batchDelete.commit()).pipe(
					mergeMap(() => {
						// save all new
						const batchAdd = this.afs.firestore.batch();
						for (const carToSave of carData) {
							carToSave.carGroup = carGroup;
							batchAdd.set(this.afs.collection(environment.carDataCollection).ref.doc(), carToSave as DocumentData);
						}
						return from(batchAdd.commit());
					}));
			})
		);
	}

	public createNewUserWithCarGroup(user: User): Observable<number> {
		return this.afs.collection(environment.userCollection, (ref: CollectionReference) => {
			return ref.orderBy('carGroup').limit(1);
		}).valueChanges().pipe(
			map((lastCarGroup: SscUser[]) => {
				const newCarGroup = lastCarGroup[0].carGroup + 1;
				this.afs.collection(environment.userCollection).doc(user.uid).set({carGroup: newCarGroup});
				return newCarGroup;
			})
		);
	}

	private getSavedCarDataCollection(carGroup: number): AngularFirestoreCollection<CarData[]> {
		return this.afs.collection(environment.carDataCollection, (ref: CollectionReference) => {
			return ref.where('carGroup', '==', carGroup);
		});
	}
}
