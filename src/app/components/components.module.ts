import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { ViajeComponent } from './viaje/viaje.component';
import { HomeCardComponent } from './home-card/home-card.component';



@NgModule({
  declarations: [MenuPrincipalComponent,ViajeComponent,HomeCardComponent],
  exports: [MenuPrincipalComponent,ViajeComponent,HomeCardComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
