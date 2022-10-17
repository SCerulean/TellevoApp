import { Component, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AnimationController  } from '@ionic/angular';
import { Viaje } from '../clases/viaje';
import { BDviajeService } from '../services/bdviaje.service';
import { dbsqlservice } from '../services/dbsql.service';

@Component({
  selector: 'app-home', 
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'], 
})


export class HomePage {
  nombre : string ;
    fono : string;
    viajes: Viaje[];
  constructor(public bdviaje : BDviajeService, 
    private activeroute: ActivatedRoute, 
    private router: Router,
    public alertController:AlertController,
    private menu:MenuController, 
    private animationCtr: AnimationController,
    private servicioBD:dbsqlservice) { }

    ngOnInit(){
      this.servicioBD.dbState().subscribe((res)=>{
        if(res){
          this.servicioBD.fetchNoticias().subscribe(item=>{
            this.viajes=item;
          })
        }
      })
    }

    getItem($event) {
      const valor = $event.target.value;
      console.log('valor del control: ' + valor);
      this.servicioBD.presentToast(valor);
  
    }

    
  eliminar(item) {
    this.servicioBD.deleteNoticia(item.id);
    this.servicioBD.presentToast("Noticia Eliminada");
  }

    async onclicka() {
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Important message',
        message: 'This is an alert!',
        buttons: ['OK'],
      });
  
      await alert.present();
    }

    async onclick(){
      this.menu.toggle
    }



    cerrarSesion(){
    
      localStorage.removeItem('nombre')
      localStorage.removeItem('Token')
      this.router.navigate(['/login']);

    }
  }
  

