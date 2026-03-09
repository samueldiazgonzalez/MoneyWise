import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTransaccionesPage } from './lista-transacciones.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTransaccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaTransaccionesPageRoutingModule {}
