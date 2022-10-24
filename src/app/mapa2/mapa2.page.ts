import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl'
import { Router,NavigationExtras, ActivatedRoute } from '@angular/router';
import { dbsqlservice } from '../services/dbsql.service';
import { Viaje } from '../clases/viaje';


@Component({
  selector: 'app-mapa2',
  templateUrl: './mapa2.page.html',
  styleUrls: ['./mapa2.page.scss'],
})
export class Mapa2Page implements OnInit {

  viajes:Viaje[];

  mapa : Mapboxgl.Map
  Marker :Mapboxgl.Marker
  lng:number;
  lat:number;

  constructor( private router:Router,private servicioBD:dbsqlservice ,private activeroute:ActivatedRoute) {
    
    this.activeroute.queryParams.subscribe(params => { 
      if (this.router.getCurrentNavigation().extras.state) { 
        this.lng = this.router.getCurrentNavigation().extras.state.lng; 
        this.lat = this.router.getCurrentNavigation().extras.state.lat;
        console.log(this.lng,this.lat);
        
      }
    });
   }

  ngOnInit() {

    (Mapboxgl as any).accessToken =  environment.mapBoxkey
  this.mapa = new Mapboxgl.Map({
  container: 'mapbox', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [ this.lng,this.lat], // starting position [lng, lat]
  zoom: 16, // starting zoom
  


});
this.crearMarker2( this.lng,this.lat);
this.crearMarker(-71.5338682,-33.0339229);


  }
  

 crearMarker(lng : number ,lat: number){
  this.Marker = new Mapboxgl.Marker({
  }).setLngLat([lng,lat]).addTo(this.mapa);

}

crearMarker2(lng : number ,lat: number){
  this.Marker = new Mapboxgl.Marker({
    color : '#FF0000',
  }).setLngLat([lng,lat]).addTo(this.mapa);

}
}
