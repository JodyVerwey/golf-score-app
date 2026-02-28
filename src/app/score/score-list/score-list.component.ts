import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  collection,
  query,
  orderBy,
  CollectionReference,
  collectionData,
  Timestamp
} from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Game {
  id?: string;
  courseName: string;
  totalScore: number;
  createdAt: Timestamp;
}

@Component({
  selector: 'app-score-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css'],
})
export class ScoreListComponent {

  private firestore = inject(Firestore);
  private auth = inject(Auth);

  games$ = authState(this.auth).pipe(
    switchMap(user => {
      if (!user) return of([] as Game[]);

      const gamesRef = collection(
        this.firestore,
        `users/${user.uid}/games`
      ) as CollectionReference<Game>;   // 🔥 THIS IS THE FIX

      const q = query(gamesRef, orderBy('createdAt', 'desc'));

      return collectionData(q, { idField: 'id' });
    })
  );
}