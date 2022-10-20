import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Viaje } from 'src/app/clases/viaje';
import { dbsqlservice } from 'src/app/services/dbsql.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  nombre =localStorage.getItem('nombre');
  
  viajes: Viaje[];
  constructor(private alertController: AlertController, private servicioBD:dbsqlservice) { }



  ngOnInit(){
    this.servicioBD.dbState().subscribe((res)=>{
      if(res){
        this.servicioBD.fetchViajes().subscribe(item=>{
          this.viajes=item;
        })
      }
    })
  }



eliminar(item) {
  this.servicioBD.deleteViaje(item.id);
  this.servicioBD.userViajes(this.nombre)
  this.servicioBD.presentToast("viaje eliminado");
}
  

  
}