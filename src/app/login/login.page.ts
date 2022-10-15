import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras} from '@angular/router';
import { Credenciales,ARcrede } from '../interfaces/viaje';
import { LrouteService } from '../services/lroute.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  field: string = "" ;
  crede:Credenciales[]=[];
  constructor(
    private router: Router, 
    public toastController: ToastController, 
    private gjson : LrouteService) { } 

    ngOnInit(){
      this.gjson.getCredenciales().subscribe(resp=>
        {
          console.log('crede',resp.alumnos);
          this.crede = resp.alumnos
          console.log(this.crede)
         
        });
    }


    
  ingresar() {
  

    console.log(this.crede)

  }

  /*
  ingresar() {
    if (this.validateModel(this.user)) {
      this.presentToast("Bienvenido  "+this.user.usuario, 3000)
      // declaracion de instacia y envio al home
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user 
        }
      };
      this.router.navigate(['/home'], navigationExtras); 
    }else{
      this.presentToast("Falta: "+this.field);
      
    }

  }
  */


  Restablecer(){
    this.router.navigate(['/restablecer']);
    
  }
  //validar campos 
  validateModel(model: any) {
    for (var [key, value] of Object.entries(model)) {
      //verifico campo vacio
      if (value == "") {
        this.field = key;
        return false;
      }
    }
    return true;
  }

  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 2000 
    });
    toast.present();
  }

}
