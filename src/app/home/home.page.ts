/** Importaciones de librerias a usar */

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

// Decorador Componente este indica que el Home Page es un Componente
@Component({
  selector: 'app-home', // Nombre del selector como <input> o <main-page>
  templateUrl: 'home.page.html', // Arhivo HTML de la visual a trabajar
  styleUrls: ['home.page.scss'], // Archivo/s de estilos
})
export class HomePage {
  user:any;
  data: any={
    nombre: "unknown",
    carrera:"unknown",
  }; // Generamos una variable Any (permite cualquier valor)

  /**
   * En el constructor del HomePage se colocan por parametros
   * todas aquellas propiedades con el siguiente formato
   * private = visibilidad
   * activeRoute = identificador
   * ActiveRoute = Tipo de Objeto
   * : Indica que el identificador sera de la clase posterior a los : puntos
   * 
   */
  

  constructor(private activeroute: ActivatedRoute, private router: Router, public alertController:AlertController,private menuCTR:MenuController) {
    // Se llama a la ruta activa y se obtiene sus parametros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      if (this.router.getCurrentNavigation().extras.state) { // Validamos que en la navegacion actual tenga extras
        this.user = this.router.getCurrentNavigation().extras.state.user; // Si tiene extra rescata lo enviado
        console.log(this.data) // Muestra por consola lo traido
      } 
    });
  }

  limpiar(){
    for (var[key, value] of Object.entries(this.data)){
      Object.defineProperty(this.data,key,{value:""})
    }
  }

  mostrar(){
    if(this.data.nombre!="" && this.data.apellido!=""){
      this.presentAlert("Usuario", "Su nombre es: "+this.data.nombre+ " " + this.data.apellido)
    }else{
      this.presentAlert("Error", "Debe ingresar Nombre y Apellido")
    }
  }

  async presentAlert(title:string, msg:string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  Onclick() {
    this.menuCTR.toggle();

  }
}
