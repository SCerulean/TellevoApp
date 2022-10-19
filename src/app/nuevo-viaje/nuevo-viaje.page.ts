import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dbsqlservice } from '../services/dbsql.service';

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
})
export class NuevoViajePage implements OnInit {

  conductor = localStorage.getItem('nombre')
  capacidad = "";
  destino = "";
  constructor(private dbservice:dbsqlservice,private router:Router) { }

  guardar() {
    this.dbservice.addViaje(this.conductor,this.capacidad,this.destino);
    this.dbservice.presentToast("VIAJE AGREE");
    this.router.navigate(['/tabs']);
    this.dbservice.userViajes(this.conductor)
  }
mapa(){
  this.router.navigate(['/mapa']);
}
  ngOnInit() {
   
    
  }


}
