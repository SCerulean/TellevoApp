import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import{ GoogleMap} from '@capacitor/google-maps'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  @ViewChild('map')MapRef:ElementRef;
  map: GoogleMap;
  constructor() { }

  ngOnInit() {}


  ionViewWillEnter(){
    console.log('mapa');
    
    this.createMap
  }


  async createMap(){ 
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.MapRef.nativeElement,
      config: {
        center:{
          lat: 33,
          lng: -100
        },zoom : 8,
      },
    });
  }
}
