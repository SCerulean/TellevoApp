import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras} from '@angular/router';
import { Credenciales,respuestaCredenciales } from '../interfaces/viaje';
import { LrouteService } from '../services/lroute.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: string = 'false';
  username: String;
  password: String;
  field: String = "" ;
  crede:Credenciales[]=[];
  constructor(
    private router: Router, 
    public toastController: ToastController, 
    private gjson : LrouteService) { } 

    ngOnInit(){
      this.gjson.getCredenciales().subscribe(resp=>
        {
         
          this.crede = resp.alumnos
          return this.crede

               
        });

        
    }


    
  ingresar() {
      for(let i in this.crede){
        if(this.username==this.crede[i].username && this.password==this.crede[i].password){
          this.login = 'true'
          localStorage.setItem('nombre',this.crede[i].nombre.toString())
          localStorage.setItem('Token',this.login)
          this.router.navigate(['/home']);  
      }
      }
  }


  
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

  ngOnDestroy(){
    console.log("destroying child...")
  }

}
