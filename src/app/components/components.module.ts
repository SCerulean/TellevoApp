import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card/home-card.component';
import { CardComponent } from './card/card.component';






@NgModule({
  declarations: [HomeCardComponent,CardComponent],
  exports: [HomeCardComponent,CardComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
