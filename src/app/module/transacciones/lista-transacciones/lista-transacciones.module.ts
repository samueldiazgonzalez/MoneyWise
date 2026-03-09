import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaTransaccionesPageRoutingModule } from './lista-transacciones-routing.module';

import { ListaTransaccionesPage } from './lista-transacciones.page';
import { SharedModule } from 'src/app/shared/shared-module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTransaccionesPageRoutingModule,
    SharedModule,
    
  ],
  declarations: [ListaTransaccionesPage]
})
export class ListaTransaccionesPageModule {}
