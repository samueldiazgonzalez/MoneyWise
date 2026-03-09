import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../../core/services/transaccion';
import { Transaccion } from '../../../core/models/transaccion';
import { ModalController } from '@ionic/angular';
import { TransactionDetailComponent } from 'src/app/shared/components/transaction-detail/transaction-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones.page.scss'],
  standalone: false
})
export class ListaTransaccionesPage implements OnInit {
  
tipoFiltro: string = 'todos';
categoriaFiltro: string = '';
textoBusqueda: string = '';

cambiarTipo(event:any){
  this.tipoFiltro = event;
}

cambiarCategoria(event:any){
  this.categoriaFiltro = event;
}

cambiarBusqueda(event:any){
  this.textoBusqueda = event;
}

  transacciones: Transaccion[] = [];

  constructor(
    private transaccionService: TransaccionService,
    private modalCtrl: ModalController,
     private router: Router
  ) {}

  ngOnInit(){}

onSearchChange(event:any){
  console.log(event.detail.value);
  this.textoBusqueda = event.detail.value;
}

  async ionViewWillEnter(){

    this.transacciones =
      await this.transaccionService.getTransaccionesUsuario();


  }
transaccionSeleccionada: Transaccion | null = null;
mostrarDetalle = false;

async verDetalle(transaccion: Transaccion){

  const modal = await this.modalCtrl.create({
    component: TransactionDetailComponent,
    componentProps:{
      transaccion: transaccion
    }
  });

  await modal.present();

}

editarTransaccion(t:Transaccion){
  console.log("editar", t);
this.router.navigate(['/tabs/editar', t.getId()]);
}

eliminarTransaccion(t:Transaccion){
  this.transaccionService.eliminarTransaccion(t.getId());
}


}