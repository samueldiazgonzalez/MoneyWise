import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  standalone:false,
})
export class FilterBarComponent {

  @Output() onTipoChange = new EventEmitter<string>();
  @Output() onCategoriaChange = new EventEmitter<string>();
  @Output() onBuscarChange = new EventEmitter<string>();

  cambiarTipo(event:any){
    const valor = event.detail.value;
    this.onTipoChange.emit(valor);
  }

  cambiarCategoria(event:any){
    const valor = event.detail.value;
    this.onCategoriaChange.emit(valor);
  }

  buscar(event:any){
    const valor = event.detail.value;
    this.onBuscarChange.emit(valor);
  }

}