import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Viaje } from 'src/app/clases/viaje';
import { dbsqlservice } from 'src/app/services/dbsql.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent implements OnInit, OnDestroy {
  viajes: Viaje[];
  conductor = localStorage.getItem('nombre')
  constructor(private servicioBD:dbsqlservice,private router:Router) { }

  ngOnInit() {
    
    this.servicioBD.dbState().subscribe((res)=>{
      if(res){
        this.servicioBD.userViajes(this.conductor)
        this.servicioBD.fetchViajesUser().subscribe(item=>{
          this.viajes=item;
        })
      }
    })
  }

ngOnDestroy(){
}
  

    
eliminar(item) {
  this.servicioBD.deleteViaje(item.id);
  this.servicioBD.presentToast("viaje eliminado");
}


crear(){
  this.router.navigate(['/nuevo-viaje'])

}
}


