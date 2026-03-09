import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private storage: StorageService,
    private router: Router
  ) {}

  canActivate(): boolean {

    const session = this.storage.get('session');

    if (session) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;

  }

}