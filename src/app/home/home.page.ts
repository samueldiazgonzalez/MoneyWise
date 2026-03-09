import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(
  private storage: StorageService,
  private router: Router
  ) {
    
  }
  logout(){

  this.storage.remove('session');

  this.router.navigate(['/auth/login']);

}
}
