import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddScoreComponent } from './score/add-score/add-score.component';
import { MainLayoutComponent } from './layout/src/app/layout/main-layout.component';

export const routes: Routes = [
  // 🔓 Public routes (no sidebar)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },

  // 🔒 App routes (with sidebar layout)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'game', component: AddScoreComponent },
      { path: 'history', component: AddScoreComponent },
      { path: 'manage', component: DashboardComponent },
      { path: '', redirectTo: 'game', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
