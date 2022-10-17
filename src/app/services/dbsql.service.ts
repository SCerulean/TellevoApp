import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Viaje } from '../clases/viaje';

@Injectable({
  providedIn: 'root'
})
export class dbsqlservice {

  public database: SQLiteObject;
  tblViajes:string = "CREATE TABLE IF NOT EXISTS viaje(id INTEGER PRIMARY KEY autoincrement, conductor VARCHAR(100) NOT NULL, destino VARCHAR(100) NOT NULL,capacidad INTERGER NOT NULL);";
  listaViajes = new BehaviorSubject([]);
  private isDbReady:
    BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, 
    private platform:Platform, 
    public toastController: ToastController) { 
      this.crearBD();
    }
  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'viajes.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database= db;
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tblViajes,[]);
      this.cargarViaje();
      this.isDbReady.next(true); 
    } catch (error) {
      
    }
  }
  cargarViaje() {
    return this.database.executeSql('SELECT * FROM viaje',[])
    .then(res=>{
      let items:Viaje[]=[];
      if(res.rows.length>0){
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id:res.rows.item(i).id,
            conductor:res.rows.item(i).conductor,
            destino:res.rows.item(i).destino,
            capacidad:res.row.item(i).capacidad
          });          
        }
      }
      this.listaViajes.next(items);
    });
  }
  addViaje(conductor,destino,capacidad){
    let data=[conductor,destino,capacidad];
    return this.database.executeSql('INSERT INTO viaje(conductor,destino,capacidad) VALUES(?,?,?)',data)
    .then(()=>{
      this.cargarViaje();
    });
  }
 
  
  deleteViaje(id){
    return this.database.executeSql('DELETE FROM viaje WHERE id=?',[id])
    .then(()=>{
      this.cargarViaje();
    });
  }
  dbState(){
    return this.isDbReady.asObservable();
  }

  fechtViaje(): Observable<Viaje[]> {
    return this.listaViajes.asObservable();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
