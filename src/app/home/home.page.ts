import { Component, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AnimationController  } from '@ionic/angular';


@Component({
  selector: 'app-home', 
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'], 
})


export class HomePage {
  nombre : string ;
    fono : string;
 
  constructor( 
    private router: Router,
    public alertController:AlertController,
    private menu:MenuController, 
   ) { }



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
  

