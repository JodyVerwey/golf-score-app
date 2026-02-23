import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Game } from './model/game.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  async saveGame(game: Game) {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('User not authenticated');
    }

    const gamesRef = collection(this.firestore, `users/${user.uid}/games`);

    return await addDoc(gamesRef, {
      ...game,
      createdAt: new Date()
    });
  }
}