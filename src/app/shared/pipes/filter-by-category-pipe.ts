import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion';

@Pipe({
  name: 'filterByCategory',
  standalone: false,
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(transacciones: Transaccion[], categoria: string): Transaccion[] {

    if (!transacciones) return [];

    if (!categoria || categoria === 'todas') {
      return transacciones;
    }

    categoria = categoria.toLowerCase().trim();

    return transacciones.filter(t =>
      t.getCategoria().toLowerCase().includes(categoria)
    );

  }

}