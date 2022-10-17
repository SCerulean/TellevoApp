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
  capacidad: number;
  destino: string;
  constructor(private dbservice:dbsqlservice,private router:Router) { }

  guardar() {
    this.dbservice.addViaje(this.conductor,this.destino,this.capacidad);
    this.dbservice.presentToast("VIAJE AGREE");
    this.router.navigate(['/tabs']);
  }
mapa(){
  this.router.navigate(['/mapa']);
}
  ngOnInit() {
  }

}
