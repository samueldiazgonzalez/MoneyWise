import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion';

@Pipe({
  name: 'searchByText',
  standalone: false,
})
export class SearchByTextPipe implements PipeTransform {

  transform(transacciones: Transaccion[], texto: string): Transaccion[] {

    if (!transacciones) return [];

    if (!texto || texto.trim() === '') {
      return transacciones;
    }

    texto = texto.toLowerCase();

    return transacciones.filter(t =>
      t.getDescripcion().toLowerCase().includes(texto)
    );
  }

}