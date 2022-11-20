import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router} from '@angular/router';
import { Credenciales } from '../../interfaces/viaje';
import { LrouteService } from '../../services/lroute.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  login: string = 'false';
  username: String;
  password: String;

  constructor(
    private router: Router, 
    public toastController: ToastController, 
    private gjson : LrouteService) { } 

    ngOnInit(){  
      
        
    }

  
 ingresar(){
  this.gjson.ingresar(this.username,this.password,this.login)
 }
 

  
  Restablecer(){
    this.router.navigate(['/restablecer']);
    
  }
}
