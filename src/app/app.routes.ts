import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { AddScoreComponent } from './score/add-score/add-score.component';
import { MainLayoutComponent } from './layout/src/app/layout/main-layout.component';
import { ScoreListComponent } from './score/score-list/score-list.component';
import { adminGuard } from './auth/admin.guard';
import { ManageUsersComponent } from './manage/manage-users.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'game', component: AddScoreComponent },
      { path: 'history', component: ScoreListComponent },
      {
        path: 'manage',
        component: ManageUsersComponent,
        canActivate: [adminGuard],
      },
      { path: '', redirectTo: 'game', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
