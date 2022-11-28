import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { on } from 'events';
import { Vehiculo } from 'src/app/clases/viaje';
import { dbsqlservice } from '../../services/dbsql.service';



@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
})
export class NuevoViajePage implements OnInit {
e: any;
  vehiculos: Vehiculo[];
  conductor = localStorage.getItem('nombre')
  contacto= localStorage.getItem("email")
  capacidad =4;
  destino = "";
  precio :number;
  hora: Date;
    lng :number;
    lat:number;

  
 
  constructor(private dbservice:dbsqlservice,private router:Router,private servicioBD:dbsqlservice, private activeroute:ActivatedRoute) { 

    this.activeroute.queryParams.subscribe(params => { 
      if (this.router.getCurrentNavigation().extras.state) { 
        this.lng = this.router.getCurrentNavigation().extras.state.lng; 
        this.lat = this.router.getCurrentNavigation().extras.state.lat;
      }
    });
    
  }

  ngOnInit() {


    this.servicioBD.dbState().subscribe((res)=>{
      if(res){
        this.servicioBD.userVehiculos(this.conductor)
        this.servicioBD.fetchVehiculoUser().subscribe(item=>{
          this.vehiculos=item;
        })
      }
    })
   
    
  }


  guardar(v) {
    this.dbservice.addViaje(this.conductor,this.capacidad,this.precio,this.destino,this.contacto,this.lng,this.lat);
    this.dbservice.presentToast("VIAJE AGREGADO");
    this.router.navigate(['/tabs']);
    this.dbservice.userViajes(this.conductor)
  }
mapa(){
  this.router.navigate(['/maps']);
}

a(){

console.log(this.hora);

}



}
