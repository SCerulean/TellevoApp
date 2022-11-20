import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/clases/viaje';
import { dbsqlservice } from 'src/app/services/dbsql.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss'],
})
export class VehiculoComponent implements OnInit {
  

  vehiculos: Vehiculo[];
  conductor = localStorage.getItem('nombre')
  constructor(private servicioBD:dbsqlservice,private router:Router) { }

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

ngOnDestroy(){
}
  

    
eliminar(item) {
  this.servicioBD.deleteVehiculo(item.patente,item.dueno);
  this.servicioBD.presentToast("viaje eliminado");
  window.location.reload()
}


crear(){
  this.router.navigate(['/nuevo-viaje'])
 

}
}


