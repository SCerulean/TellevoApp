import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Viaje } from '../interfaces/viaje';

@Injectable({
  providedIn: 'root'
})
export class BDviajeService {

  agenda: Viaje[]=[];
  private _storage:Storage | null=null;
  constructor(private storage:Storage,public toastController:ToastController) {
    this.init();
   }
   
  async init() {
    const storage= await this.storage.create();
    this._storage=storage;
    //cargo el contenido de IonicStorage (bd local) a mi agenda
    this.cargarContactos();
  }

  guardarContacto(nombre: string,fono: string){
    //creo una consulta lambda para saber si el numero no existe en la bd
    const existe=this.agenda.find(c=>c.strdestino==fono);
    if(!existe){
      //insertar un nuevo contacto en la agenda
      this.agenda.unshift({strconductor:nombre,strdestino:fono});
      this._storage.set('agenda', this.agenda);
      this.presentToast("Contacto Agregado con Exito!!")
    }else{
      this.presentToast("Error: Contacto YA EXiste!!")
    }
  }
  async cargarContactos(){
    const miAgenda= await this.storage.get('agenda');
    if(miAgenda){
      this.agenda=miAgenda;
    }
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      translucent:true,
      color:'medium',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}


