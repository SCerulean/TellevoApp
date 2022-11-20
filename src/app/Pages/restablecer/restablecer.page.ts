import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  email = {
    correo: ""
  }
  field:string =""
  constructor( private router: Router,public ToastCrt: ToastController ,private alertCRT : AlertController) { }

  


  ngOnInit() {
  }


  back(){
    this.router.navigate(['/login']);
  

  }


  

  validateModel(model: any) {
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [key, value] of Object.entries(model)) {
      //verifico campo vacio
      if (value == "") {
        this.field = key;
        return false;
      }
    }
    return true;
  }



  envioEmailclic() {
    if (this.validateModel(this.email)) {
     this.envioEmailRes()
      
    }else {
      this.presentToast("No es un correo valido")
    }
  }


  async envioEmailRes() {
    const alert = await this.alertCRT.create({
      message: 'Se ha enviado un correo de restablecimiento a '+this.email.correo,
      buttons: ['OK'],
    });

    await alert.present();
  }


  
  async presentAlert(title:string, msg:string) {
    const alert = await this.alertCRT.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast(msg: string, duration?: number) {
    const toast = await this.ToastCrt.create({
      message: msg,
      duration: duration ? duration : 2000 //si no viene el parámetro el tiempo es 2000
    });
    toast.present();
  }



  //funcion que hay que comprobar 
   esEmailValido(email: string):boolean {
    let mailValido = false;
      'use strict';

      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
  }

}


