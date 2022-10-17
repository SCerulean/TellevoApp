import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Viaje } from '../clases/viaje';
import { dbsqlservice } from '../services/dbsql.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  noticias: Viaje[];
  constructor(private servicioBD:dbsqlservice, private router:Router) { }

  ngOnInit(){
    this.servicioBD.dbState().subscribe((res)=>{
      if(res){
        this.servicioBD.fetchNoticias().subscribe(item=>{
          this.noticias=item;
        })
      }
    })
  }

  getItem($event) {
    const valor = $event.target.value;
    console.log('valor del control: ' + valor);
    this.servicioBD.presentToast(valor);

  }
}
