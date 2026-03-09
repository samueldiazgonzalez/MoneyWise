import { Injectable } from '@angular/core';
import { StorageService } from './storage';
import { AuthService } from './auth';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  constructor(
    private storage: StorageService,
    private authService: AuthService
  ) {}

async guardarTransaccion(transaccion: Transaccion){

  const usuario = await this.authService.getUsuarioActual();

  if(!usuario){
    console.log("No hay usuario logueado");
    return;
  }

  let users = this.storage.get('users') || [];

  // buscar el usuario correcto
  const index = users.findIndex(
    (u:any)=> u.id === usuario.id
  );

  if(index === -1){
    console.log("Usuario no encontrado");
    return;
  }

  // crear arreglo si no existe
  if(!users[index].transacciones){
    users[index].transacciones = [];
  }

  // guardar transacción SOLO en ese usuario
  users[index].transacciones.push(transaccion);

  // guardar cambios
  this.storage.set('users', users);

}

async getTransaccionesUsuario(){

  const usuario = await this.authService.getUsuarioActual();

  if(!usuario) return [];

  let users = this.storage.get('users') || [];

  const user = users.find((u:any)=>u.id === usuario.id);

  if(!user) return [];

  // reconstruir las clases
  return user.transacciones.map((t:any)=>

    new Transaccion(
      t.id,
      t.tipo,
      t.categoria,
      new Date(t.fecha),
      t.monto,
      t.descripcion,
      t.comprobante
    )

  );

}


  // ELIMINAR TRANSACCION
  async eliminarTransaccion(id:string){

    const usuario = await this.authService.getUsuarioActual();

    if(!usuario){
      return;
    }

    let users = this.storage.get('users') || [];

    const index = users.findIndex(
      (u:any) => u.id === usuario.id
    );

    if(index !== -1){

      users[index].transacciones =
        users[index].transacciones.filter((t:any)=> t.id !== id);

      this.storage.set('users', users);

      this.storage.set('session', users[index]);

    }

  }

  async actualizarTransaccion(transaccion: Transaccion){

  const usuario = await this.authService.getUsuarioActual();

  if(!usuario){
    return;
  }

  let users = await this.storage.get('users') || [];

  const index = users.findIndex(
    (u:any)=> u.id === usuario.id
  );

  if(index !== -1){

    const transIndex =
      users[index].transacciones.findIndex(
        (t:any)=> t.id === transaccion.getId()
      );

    if(transIndex !== -1){

      users[index].transacciones[transIndex] = transaccion;

      await this.storage.set('users', users);

      await this.storage.set('session', users[index]);

    }

  }

}

}