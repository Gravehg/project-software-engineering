import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isLogged().pipe(
    map((response) => {
      if (response.status === 200) {
        return true;
      } else {
        router.navigate(['/not-loged-in']); // Redirect to login if not authenticated
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/not-loged-in']); // Redirect to login on error
      return of(false);
    })
  );
};
