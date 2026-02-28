import { Timestamp } from '@angular/fire/firestore';

export interface Hole {
  holeNumber: number;
  par: number;
  distance: number;
  strokes: number;
}

export interface Game {
  id?: string;
  courseName?: string; // optional
  createdAt: Timestamp; // 🔥 MUST be Timestamp
  totalPar: number;
  totalStrokes: number;
  holes: Hole[];
}
