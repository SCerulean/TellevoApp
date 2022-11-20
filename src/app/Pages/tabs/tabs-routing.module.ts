import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard'
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children :[{

      path: 'home',loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),canActivate:[AuthGuard]
    },
    {

      path: 'busqueda',loadChildren: () => import('../busqueda/busqueda.module').then( m => m.BusquedaPageModule),canActivate:[AuthGuard]
    }, 
  
    {
      path: '',
      redirectTo: '/tabs/home',
      pathMatch: 'full'
    } 
  ]
}, 
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class TabsPageRoutingModule {}
