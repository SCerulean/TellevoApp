import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service'
import { AuthGuard } from './auth/auth.guard'


const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'tabs',  //matener el tabs como base path para que al pasar el guard me redirija al tabs/home si existe un token
    pathMatch: 'full'
  },
  {
    path: 'login',loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'restablecer',loadChildren: () => import('./Pages/restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./Pages/tabs/tabs.module').then( m => m.TabsPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'nuevo-viaje',
    loadChildren: () => import('./Pages/nuevo-viaje/nuevo-viaje.module').then( m => m.NuevoViajePageModule),canActivate:[AuthGuard]
  },
  {
    path: 'maps',
    loadChildren: () => import('./Pages/maps/maps.module').then( m => m.MapsPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'mapa2',
    loadChildren: () => import('./Pages/mapa2/mapa2.module').then( m => m.Mapa2PageModule),canActivate:[AuthGuard]
  },
  {
    path: 'vehiculo',
    loadChildren: () => import('./Pages/vehiculo/vehiculo.module').then( m => m.VehiculoPageModule)
  },
  {
    path: 'detection',
    loadChildren: () => import('./Pages/detection/detection.module').then( m => m.DetectionPageModule)
  },



 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AuthService, AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
