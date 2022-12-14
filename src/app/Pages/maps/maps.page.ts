import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl'
import { Router,NavigationExtras } from '@angular/router';




@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  mapa : Mapboxgl.Map
  Marker =new Mapboxgl.Marker

  constructor( private router:Router) { }

  ngOnInit() {
    (Mapboxgl as any).accessToken =  environment.mapBoxkey
  this.mapa = new Mapboxgl.Map({
  container: 'mapbox', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-71.5338682,-33.0339229], // starting position [lng, lat]
  zoom: 16, // starting zoom
  


});
this.setMarker()
this.crearMarker(-71.5338682,-33.0339229);

  }
  


setMarker(){
  this.mapa.on('click', (e) => {
    this.Marker.setLngLat(e.lngLat)
})}


 crearMarker(lng : number ,lat: number){
  this.Marker = new Mapboxgl.Marker({
   
    draggable : true
  }).setLngLat([lng,lat]).addTo(this.mapa);

  this.Marker.on('drag', ()=> {

    console.log(this.Marker.getLngLat())

  })
  

 }

 

 
 guardar(){

  console.log(this.Marker.getLngLat().lng,this.Marker.getLngLat().lat)
  
  let navigationExtras: NavigationExtras = {
    state: {
      lng:  this.Marker.getLngLat().lng,
      lat: this.Marker.getLngLat().lat
       
    }
  };
  this.router.navigate(['/nuevo-viaje'], navigationExtras);
    
}



} 


