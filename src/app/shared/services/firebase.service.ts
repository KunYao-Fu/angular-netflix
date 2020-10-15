import { Injectable } from '@angular/core';
import { filter, map, take, switchMap, tap } from 'rxjs/operators';
import { Subject, ReplaySubject, of, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private $firebaseStore: AngularFirestore
  ) {
  }

  public collection(name: string) {
    const errorHandler = (error) => {
      throw error;
    };
    return {
      create: (data: any) => this.$firebaseStore
        .collection(name)
        .add(data)
        .catch(error => errorHandler(error)),
      update: (id: string, data: any) => this.$firebaseStore
        .collection(name)
        .doc(id)
        .update(data)
        .catch(error => errorHandler(error)),
      delete: (id: string) => this.$firebaseStore
        .collection(name)
        .doc(id)
        .delete()
        .catch(error => errorHandler(error))
    };
  }

  public document(name: string, id: string) {
    const doc = this.$firebaseStore.collection(name).doc(id);
    return {
      create: (data: any) => doc.set(data),
      read$: () => doc.get(),
      update: (data: any) => doc.set(data, { merge: true }),
    };
  }
}
