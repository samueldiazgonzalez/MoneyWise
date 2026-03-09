import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { StorageService } from '../../../core/services/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

    // PROPIEDADES
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  register() {
    
    let users = this.storage.get('users') || [];

    let exist = users.find((u:any) => u.email === this.email);

    if(exist){
      alert("El usuario ya existe");
      return;
    }

  if(!this.nombre || !this.email || !this.password){
    alert("Todos los campos son obligatorios");
    return;
  }

 

  const newUser = new User(
    Date.now().toString(),
    this.nombre,
    this.email,
    this.password,
    []
  );

  users.push(newUser);

  this.storage.set('users', users);

}

}
