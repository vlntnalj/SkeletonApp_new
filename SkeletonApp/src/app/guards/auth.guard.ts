import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = async () => {
  const session = inject(SessionService);
  const router = inject(Router);

  const logged = await session.isLoggedIn();

  if (!logged) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
