import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
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
    lng :number;
    lat:number;

  
 
  constructor(private dbservice:dbsqlservice,private router:Router, private activeroute:ActivatedRoute) { 

    this.activeroute.queryParams.subscribe(params => { 
      if (this.router.getCurrentNavigation().extras.state) { 
        this.lng = this.router.getCurrentNavigation().extras.state.lng; 
        this.lat = this.router.getCurrentNavigation().extras.state.lat;
      }
    });
    
  }

  guardar() {
    this.dbservice.addViaje(this.conductor,this.capacidad,this.destino,this.lng,this.lat);
    this.dbservice.presentToast("VIAJE AGREE");
    this.router.navigate(['/tabs']);
    this.dbservice.userViajes(this.conductor)
  }
mapa(){
  this.router.navigate(['/maps']);
}
  ngOnInit() {
   
    
  }


}
