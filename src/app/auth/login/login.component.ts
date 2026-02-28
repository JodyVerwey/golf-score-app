import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  login() {
    this.error = '';

    this.auth
      .login(this.email, this.password)
      .then(async ({ user }) => {
        if (!user) {
          this.error = 'Login failed';
          return;
        }

        await user.reload();
        if (!user.emailVerified) {
          this.error = 'Please verify your email before logging in.';
          return;
        }

        this.router.navigate(['/game']);
      })
      .catch((err) => (this.error = err.message));
  }
  register() {
    this.router.navigate(['/register']);
  }
}
