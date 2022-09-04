/** Importaciones de librerias a usar */
import { Component, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AnimationController  } from '@ionic/angular';

@Component({
  selector: 'app-home', // Nombre del selector como <input> o <main-page>
  templateUrl: 'home.page.html', // Arhivo HTML de la visual a trabajar
  styleUrls: ['home.page.scss'], // Archivo/s de estilos
})


export class HomePage {
  user:any;
  data: any={
    nombre: "unknown",
    carrera:"Ingenieria en informatica",
  }; 

  @ViewChild('squareA', { read: ElementRef, static: true }) squareA: ElementRef;

  constructor(private activeroute: ActivatedRoute, private router: Router, public alertController:AlertController,private menuCTR:MenuController, private animationCtr: AnimationController) {
    // Se llama a la ruta activa y se obtiene sus parametros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      if (this.router.getCurrentNavigation().extras.state) { // Validamos que en la navegacion actual tenga extras
        this.user = this.router.getCurrentNavigation().extras.state.user; // Si tiene extra rescata lo enviado
        console.log(this.data) // Muestra por consola lo traido
      } 
    });
  }

  ngAfterViewInit() {
    const squareA = this.animationCtr.create()
  .addElement(this.squareA.nativeElement)
  .duration(5000)
  .keyframes([
    { offset: 0, transform: 'scale(1))', opacity: '0.5' },
    { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
    { offset: 1, transform: 'scale(1)', opacity: '0.5' }
  ]);
      
      const miAnimacion =  this.animationCtr.create()
      .duration(4000)
      .iterations(Infinity)
      .addAnimation([squareA]);
    
      miAnimacion.play()


    }



  async presentAlert(title:string, msg:string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  onClick() {
    this.menuCTR.toggle();

  }




  
}
