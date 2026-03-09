import { Transaccion } from './transaccion';

export class User {

  private id: string;
  private nombre: string;
  private email: string;
  private password: string;
  private transacciones: Transaccion[];

  constructor(
    id: string,
    nombre: string,
    email: string,
    password: string,
    transacciones: Transaccion[] = []
  ) {

    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.transacciones = transacciones;

  }

  // GETTERS

  getId(): string {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getTransacciones(): Transaccion[] {
    return this.transacciones;
  }

  // SETTERS

  setId(id: string) {
    this.id = id;
  }

  setNombre(nombre: string) {
    this.nombre = nombre;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setTransacciones(transacciones: Transaccion[]) {
    this.transacciones = transacciones;
  }

  agregarTransaccion(t: Transaccion) {
    this.transacciones.push(t);
  }

}