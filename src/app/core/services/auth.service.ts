import { Injectable } from '@angular/core';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageService) {}

  login(email: string, password: string) {

    const usuario = this.storage.get('usuario');

    if (usuario && usuario.email === email && usuario.password === password) {
      return true;
    }

    return false;
  }

  register(usuario: any) {
    this.storage.set('usuario', usuario);
  }

  getUsuario() {
    return this.storage.get('usuario');
  }

  logout() {
    this.storage.remove('usuario');
  }

}