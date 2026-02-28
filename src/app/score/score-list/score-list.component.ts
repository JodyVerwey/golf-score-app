import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  collection,
  query,
  orderBy,
  collectionData,
  CollectionReference
} from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Game, Hole } from '../model/game.model';

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

  expandedGameId: string | null = null;

  games$ = authState(this.auth).pipe(
    switchMap(user => {
      if (!user) return of([] as Game[]);

      const gamesRef = collection(
        this.firestore,
        `users/${user.uid}/games`
      ) as CollectionReference<Game>;

      const q = query(gamesRef, orderBy('createdAt', 'desc'));

      return collectionData(q, { idField: 'id' });
    })
  );

  toggle(gameId: string) {
    this.expandedGameId =
      this.expandedGameId === gameId ? null : gameId;
  }

  getTotalDistance(holes: Hole[]): number {
    return holes.reduce((sum, h) => sum + h.distance, 0);
  }

  getScoreDiff(game: Game): number {
    return game.totalStrokes - game.totalPar;
  }
}