import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dbsqlservice } from 'src/app/services/dbsql.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

  dueno = localStorage.getItem('nombre')
  capacidad :number;
  patente = "";
  nombre :'';
  


  constructor(private dbservice:dbsqlservice,private router:Router, private activeroute:ActivatedRoute) { }

  ngOnInit() {
  }


  Ingresar() {
    this.dbservice.addVehiculo(this.patente,this.capacidad,this.nombre,this.dueno);
    this.dbservice.presentToast("vehiculo AGREGADO");
    this.router.navigate(['/tabs']);
    this.dbservice.userVehiculos(this.dueno)
  }
}
