import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);
  const isLoggedIn = sellerService.checkLoginStatus();
  if (isLoggedIn) {
    return true;
  } else {
    // Navigate to login page if not logged in
    const router = inject(Router);
    router.navigate(['/sel-auth']);
    return false;
  }
};
