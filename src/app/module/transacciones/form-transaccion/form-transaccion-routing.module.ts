import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormTransaccionPage } from './form-transaccion.page';

const routes: Routes = [
  {
    path: '',
    component: FormTransaccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormTransaccionPageRoutingModule {}
