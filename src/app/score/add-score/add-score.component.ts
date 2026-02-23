import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game, Hole } from '../model/game.model';
import { ScoreService } from '../score.service';

@Component({
  standalone: true,
  selector: 'app-add-score',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-score.component.html',
  styleUrl: './add-score.component.css',
})
export class AddScoreComponent {
  holes: Hole[] = [];

  constructor(private scoreService: ScoreService) {
    this.initializeHoles(18);
  }

  initializeHoles(count: number) {
    this.holes = [];

    for (let i = 1; i <= count; i++) {
      this.holes.push({
        holeNumber: i,
        par: 4,
        distance: 0,
        strokes: 0,
      });
    }
  }

  get totalPar(): number {
    return this.holes.reduce((sum, h) => sum + h.par, 0);
  }

  get totalStrokes(): number {
    return this.holes.reduce((sum, h) => sum + h.strokes, 0);
  }

  async saveGame() {
    const game: Game = {
      createdAt: new Date(),
      totalPar: this.totalPar,
      totalStrokes: this.totalStrokes,
      holes: this.holes,
    };

    try {
      await this.scoreService.saveGame(game);
      console.log('Game saved successfully');
      alert('Game saved!');
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  }
}
