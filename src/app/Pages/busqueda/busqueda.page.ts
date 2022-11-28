import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Viaje } from '../../clases/viaje';
import { dbsqlservice } from '../../services/dbsql.service';
import emailjs from '@emailjs/browser'
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  viajes: Viaje[];
  constructor(private servicioBD:dbsqlservice, private router:Router) { }

  ngOnInit(){
    this.servicioBD.dbState().subscribe((res)=>{
      if(res){
        this.servicioBD.fetchViajes().subscribe(item=>{
          this.viajes=item;
        })
      }
    })
  }

   
 ver(item){
  let navigationExtras: NavigationExtras = {
    state: {
      lng:  item.lng,
      lat : item.lat
       
    }
  };
  this.router.navigate(['/mapa2'], navigationExtras);
    
}

tomarViaje(item){
  const templateParams = {
    nombre: localStorage.getItem('nombre'),
    email: localStorage.getItem('email'),
    hora: item.conductor,
    destino: item.destino
  };
  
  emailjs.send('service_qqyfx9e','template_is460hc', templateParams, environment.emmailkey)
  .then((response) => {
     console.log('SUCCESS!', response.status, response.text);
     this.servicioBD.presentToast("HAS ENTRADO AL VIAJE")
  }, (err) => {
     console.log('FAILED...', err);
     this.servicioBD.presentToast("No se pudo ingresar al viaje")
  });
  }
  
}
