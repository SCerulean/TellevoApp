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
    path: 'login',loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'restablecer',loadChildren: () => import('./restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'nuevo-viaje',
    loadChildren: () => import('./nuevo-viaje/nuevo-viaje.module').then( m => m.NuevoViajePageModule),canActivate:[AuthGuard]
  },
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then( m => m.MapsPageModule)
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
