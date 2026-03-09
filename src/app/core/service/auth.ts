import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioActual = new BehaviorSubject<any>(null);

  constructor(private storage: StorageService) {}

  getUsuario(){
    return this.usuarioActual.asObservable();
  }

  // LOGIN
  async login(email:string,password:string){

    let users = this.storage.get('users') || [];

    const user = users.find(
      (u:any)=> u.email === email && u.password === password
    );

    if(user){

      this.storage.set('session', user);

      this.usuarioActual.next(user);

      return true;
    }

    return false;
  }

  // LOGOUT
  logout(){

    this.storage.remove('session');

    this.usuarioActual.next(null);

  }

  // USUARIO ACTUAL
  async getUsuarioActual(){

    let user = this.usuarioActual.value;

    if(!user){
      user = this.storage.get('session');
      this.usuarioActual.next(user);
    }

    return user;

  }

}