import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Viaje } from '../../clases/viaje';
import { dbsqlservice } from '../../services/dbsql.service';


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

}