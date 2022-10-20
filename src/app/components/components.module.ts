import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card/home-card.component';
import { CardComponent } from './card/card.component';
import { IonicModule } from '@ionic/angular';
import{ CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { MapaComponent } from './mapa/mapa.component';







@NgModule({
  declarations: [HomeCardComponent,CardComponent,MapaComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports: [HomeCardComponent,CardComponent,MapaComponent],
  imports: [
    CommonModule,IonicModule
  ],
  
})
export class ComponentsModule { }
