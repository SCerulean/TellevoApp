import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Viaje } from 'src/app/clases/viaje';
import { dbsqlservice } from 'src/app/services/dbsql.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  nombre: String;
  
  viajes: Viaje[];
  constructor(private alertController: AlertController, private servicioBD:dbsqlservice,private router:Router) { }



  ngOnInit(){
    this.nombre = localStorage.getItem('nombre');
    this.servicioBD.dbState().subscribe((res)=>{
      if(res){
        this.servicioBD.fetchViajes().subscribe(item=>{
          this.viajes=item;
        })
      }
    })
  }

  getItem($event) {
    const valor = $event.target.value;
    console.log('valor del control: ' + valor);
    this.servicioBD.presentToast(valor);

  }

  crear(){
    this.router.navigate(['/nuevo-viaje'])
 
  }

  
eliminar(item) {
  this.servicioBD.deleteViaje(item.id);
  this.servicioBD.presentToast("viaje eliminado");
}
  

  
}