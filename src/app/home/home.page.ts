import { Component, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AnimationController  } from '@ionic/angular';
import { BDviajeService } from '../services/bdviaje.service';

@Component({
  selector: 'app-home', 
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'], 
})


export class HomePage {
  user:any;
  data: any={
    nombre: "unknown",
    carrera:"Ingenieria en informatica",
    
    

    
  }; 
  nombre : string ;
    fono : string;
  
  @ViewChild('squareA', { read: ElementRef, static: true }) squareA: ElementRef;
  @ViewChild('labelFooter', { read: ElementRef, static: true }) labelFooter: ElementRef;
  @ViewChild('buttonS', { read: ElementRef, static: true }) buttonS: ElementRef;

  constructor(public bdviaje : BDviajeService, private activeroute: ActivatedRoute, private router: Router, public alertController:AlertController,private menu:MenuController, private animationCtr: AnimationController) {
   
    this.activeroute.queryParams.subscribe(params => { 
      if (this.router.getCurrentNavigation().extras.state) { 
        this.user = this.router.getCurrentNavigation().extras.state.user; 
        console.log(this.data) 
      } 
    });
  }

  ngAfterViewInit() {
    const squareA = this.animationCtr.create()
    .addElement(this.squareA.nativeElement)
    .addElement(this.labelFooter.nativeElement)
    .addElement(this.buttonS.nativeElement)
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

    guardar(){
      this.bdviaje.guardarContacto(this.nombre,this.fono);
    }
  }
  

