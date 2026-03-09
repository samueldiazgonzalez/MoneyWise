import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

const routes: Routes = [

{
  path: '',
  redirectTo: 'auth/login',
  pathMatch: 'full'
},

{
  path: 'auth',
  loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
},

{
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  canActivate: [AuthGuard]
},
  {
  path: 'dashboard',
  loadChildren: () => import('./modules/dashboard/dashboard/dashboard.module')
  .then(m => m.DashboardPageModule),
  canActivate: [AuthGuard]
},
  {
  path: 'lista-transacciones',
  loadChildren: () =>
    import('./modules/transacciones/lista-transacciones/lista-transacciones.module')
    .then(m => m.ListaTransaccionesPageModule),
  canActivate: [AuthGuard]
},

{
  path: 'detalle-transaccion',
  loadChildren: () =>
    import('./modules/transacciones/detalle-transaccion/detalle-transaccion.module')
    .then(m => m.DetalleTransaccionPageModule),
  canActivate: [AuthGuard]
},

{
  path: 'form-transaccion',
  loadChildren: () =>
    import('./modules/transacciones/form-transaccion/form-transaccion.module')
    .then(m => m.FormTransaccionPageModule),
  canActivate: [AuthGuard]
},
 { path: 'tabs',
  loadChildren: () =>
    import('./modules/tabs/tabs.module')
    .then(m => m.TabsPageModule),
  canActivate: [AuthGuard]
}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}