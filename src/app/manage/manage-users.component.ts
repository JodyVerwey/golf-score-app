import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { deleteDoc, doc } from '@angular/fire/firestore';

import {
  Firestore,
  collection,
  query,
  orderBy,
  collectionData,
  CollectionReference,
  Timestamp,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface AppUser {
  id?: string;
  email: string;
  createdAt: Timestamp;
}

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent {
  private firestore = inject(Firestore);

  users$: Observable<AppUser[]>;

  constructor() {
    const usersRef = collection(
      this.firestore,
      'users',
    ) as CollectionReference<AppUser>;

    const q = query(usersRef, orderBy('createdAt', 'desc'));

    this.users$ = collectionData(q, { idField: 'id' });
  }

  async deleteUser(userId: string) {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    await deleteDoc(doc(this.firestore, 'users', userId));
  }
}
