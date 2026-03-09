import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormTransaccionPageRoutingModule } from './form-transaccion-routing.module';

import { FormTransaccionPage } from './form-transaccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormTransaccionPageRoutingModule
  ],
  declarations: [FormTransaccionPage]
})
export class FormTransaccionPageModule {}
