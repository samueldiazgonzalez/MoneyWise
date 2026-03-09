export class Transaccion {

  private id: string;
  private tipo: 'ingreso' | 'gasto';
  private categoria: string;
  private fecha: Date;
  private monto: number;
  private descripcion: string;
  private comprobante: string; // imagen en base64 o url

  

  constructor(
    id: string,
    tipo: 'ingreso' | 'gasto',
    categoria: string,
    fecha: Date,
    monto: number,
    descripcion: string,
    comprobante: string
  ){

    this.id = id;
    this.tipo = tipo;
    this.categoria = categoria;
    this.fecha = fecha;
    this.monto = monto;
    this.descripcion = descripcion;
    this.comprobante = comprobante;

  }

  // GETTERS

  getId(){
    return this.id;
  }

  getTipo(){
    return this.tipo;
  }

  getCategoria(){
    return this.categoria;
  }

  getFecha(){
    return this.fecha;
  }

  getMonto(){
    return this.monto;
  }

  getDescripcion(){
    return this.descripcion;
  }

  getComprobante(){
    return this.comprobante;
  }

}