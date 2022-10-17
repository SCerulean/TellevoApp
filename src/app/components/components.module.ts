import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViajeComponent } from './viaje/viaje.component';
import { HomeCardComponent } from './home-card/home-card.component';



@NgModule({
  declarations: [ViajeComponent,HomeCardComponent],
  exports: [ViajeComponent,HomeCardComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
