import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card/home-card.component';
import { CardComponent } from './card/card.component';
import { IonicModule } from '@ionic/angular';
import { VehiculoComponent } from './vehiculo/vehiculo.component';








@NgModule({
  declarations: [HomeCardComponent,CardComponent,VehiculoComponent],
  exports: [HomeCardComponent,CardComponent,VehiculoComponent],
  imports: [
    CommonModule,IonicModule
  ],
  
})
export class ComponentsModule { }
