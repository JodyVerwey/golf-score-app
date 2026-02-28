import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  User,
} from '@angular/fire/auth';

import {
  Firestore,
  doc,
  setDoc,
  serverTimestamp,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) {}

  async register(email: string, password: string): Promise<void> {
    const cred = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    );

    if (!cred.user) {
      throw new Error('User not created');
    }

    // 🔥 Create Firestore user document
    await setDoc(doc(this.firestore, 'users', cred.user.uid), {
      email: cred.user.email,
      createdAt: serverTimestamp(),
    });

    // 🔥 Send verification email
    await sendEmailVerification(cred.user);

    // Optional but recommended
    await signOut(this.auth);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }
}
