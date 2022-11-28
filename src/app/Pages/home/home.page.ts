import { Component, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


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
    public alertController:AlertController
   ) { }



    


    cerrarSesion(){
    
      localStorage.removeItem('nombre')
      localStorage.removeItem('email')
      localStorage.removeItem('Token')
      this.router.navigate(['/login']);

    }

  }
  

