import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private storage: StorageService,
    private router: Router
  ) {}

  login() {

    let usersData = this.storage.get('users') || [];

    // reconstruimos objetos User
    let users: User[] = usersData.map((u:any)=>
      new User(u.id, u.nombre, u.email, u.password)
    );

    const userFound = users.find(
      u => u.getEmail() === this.email && u.getPassword() === this.password
    );

    if(userFound){

      this.error = '';

      // guardar sesión activa
      this.storage.set('session', userFound);

      this.router.navigate(['/tabs/dashboard']);

    }else{

      this.error = 'Correo o contraseña incorrectos';

    }

  }

}