import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  getAuth,
  onAuthStateChanged,
  indexedDBLocalPersistence,
  initializeAuth,
} from 'firebase/auth';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { User } from './interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoged: any;
  auth: Auth;
  db: any;

  constructor() {
    const firebaseApp = initializeApp(environment.firebaseConfig);
    if (Capacitor.isNativePlatform()) {
      initializeAuth(firebaseApp, {
        persistence: indexedDBLocalPersistence,
      });

      this.db = getFirestore(firebaseApp);
    }
    this.auth = getAuth(firebaseApp);
    onAuthStateChanged(this.auth, (user) => {
      if (user != undefined || user != null) {
        this.isLoged = user;
      }
    });
  }

  tieneSesion() {
    return this.isLoged;
  }

  getStateAuth() {
    return this.auth;
  }
  //login
  onLogin(user: User): Promise<any> {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }
  //register
  onRegister(user: User): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }
}
