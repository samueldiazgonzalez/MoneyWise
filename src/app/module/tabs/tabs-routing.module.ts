import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [

{
  path: '',
  component: TabsPage,
  children: [

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },

    {
      path: 'dashboard',
      loadChildren: () =>
        import('../dashboard/dashboard/dashboard.module')
        .then(m => m.DashboardPageModule)
    },

    {
      path: 'transacciones',
      loadChildren: () =>
        import('../transacciones/lista-transacciones/lista-transacciones.module')
        .then(m => m.ListaTransaccionesPageModule)
    },

    {
      path: 'agregar',
      loadChildren: () =>
        import('../transacciones/form-transaccion/form-transaccion.module')
        .then(m => m.FormTransaccionPageModule)
    },
    {
      path: 'editar/:id',
      loadChildren: () =>
        import('../transacciones/form-transaccion/form-transaccion.module')
        .then(m => m.FormTransaccionPageModule)
    }

  ]
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
