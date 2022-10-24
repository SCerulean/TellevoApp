import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credenciales, respuestaCredenciales } from '../interfaces/viaje';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LrouteService {
  crede:Credenciales[]=[];
  constructor(private http:HttpClient,private router:Router,public toastController:ToastController) { }

  getCredenciales()
  {
    return this.http.get<respuestaCredenciales>(`https://nancyb3a.github.io/Test/usuarios_PGY4121_03.json`);
  }


  ingresar(username,password,login) {
    this.getCredenciales().subscribe(resp=>
      {
        this.crede = resp.alumnos
        
        for(let i in this.crede){
          if(username==this.crede[i].username && password==this.crede[i].password){
            login = 'true'
            localStorage.setItem('nombre',this.crede[i].nombre.toString())
            localStorage.setItem('Token',login)
            this.router.navigate(['/tabs']);
            break  
           
        }
        }if(login=='false'){
          
          this.presentToast('Usuario o Contraseña incorrecta',500)
     
        }   
        
        
      });
    

    
}


async presentToast(msg: string, duration?: number) {
  const toast = await this.toastController.create({
    message: msg,
    duration: duration ? duration : 2000 
  });
  toast.present();
}



}
