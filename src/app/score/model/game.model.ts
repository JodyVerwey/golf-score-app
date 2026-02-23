export interface Hole {
  holeNumber: number;
  par: number;
  distance: number;   // meters or yards
  strokes: number;    // shots taken
}

export interface Game {
  id?: string;
  createdAt: Date;
  totalPar: number;
  totalStrokes: number;
  holes: Hole[];
}