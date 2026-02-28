import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Auth, signOut, authState } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {

  private auth = inject(Auth);
  private router = inject(Router);

  user$ = authState(this.auth);

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}