import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion';

@Pipe({
  name: 'filterByType',
  standalone: false,
})
export class FilterByTypePipe implements PipeTransform {

  transform(transacciones: Transaccion[], tipo: string): Transaccion[] {

    if (!transacciones) return [];

    if (!tipo || tipo === 'todos') {
      return transacciones;
    }

    return transacciones.filter(t =>
      t.getTipo().toLowerCase() === tipo.toLowerCase()
    );

  }

}