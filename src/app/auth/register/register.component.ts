import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  register() {
    this.auth
      .register(this.email, this.password)
      .then(() => this.router.navigate(['/verify-email']))
      .catch((err) => alert(err.message));
  }
}
