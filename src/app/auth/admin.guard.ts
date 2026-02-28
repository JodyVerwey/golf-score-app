import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const adminGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    map(user => {
      if (user?.email === 'jodyverwey22@gmail.com') {
        return true;
      }
      router.navigate(['/game']);
      return false;
    })
  );
};