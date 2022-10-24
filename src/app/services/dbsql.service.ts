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
  tblViajes:string = "CREATE TABLE IF NOT EXISTS viaje(id INTEGER PRIMARY KEY autoincrement, conductor VARCHAR(50) NOT NULL, capacidad VARCHAR(50) NOT NULL, destino VARCHAR(100) NOT NULL, lng REAL NOT NULL, lat REAL NOT NULL);";
  listaViajes = new BehaviorSubject([]);
  listaViajesUser = new BehaviorSubject([]);
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
        this.database = db;
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })
  }
  async crearTablas() {
    try {
      await this.database.executeSql(this.tblViajes,[]);
      this.cargarViajes();
      this.isDbReady.next(true); 
    } catch (error) {
      this.presentToast("Error en Crear Tabla: "+error);
    }
  }
  cargarViajes() {
    return this.database.executeSql('SELECT * FROM viaje',[])
    .then(res=>{
      let items:Viaje[]=[];
      if(res.rows.length>0){
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id:res.rows.item(i).id,
            conductor:res.rows.item(i).conductor,
            capacidad:res.rows.item(i).texto,
            destino:res.rows.item(i).destino,
            lng:res.rows.item(i).lng,
            lat:res.rows.item(i).lat
          });          
        }
      }
      this.listaViajes.next(items);
    });
  }
  addViaje(conductor,capacidad,destino,lng,lat){
    let data=[conductor,capacidad,destino,lng,lat];
    return this.database.executeSql('INSERT INTO viaje(conductor,capacidad,destino,lng,lat) VALUES(?,?,?,?,?)',data)
    .then(()=>{
      this.cargarViajes();
    });
  }
  
  deleteViaje(id){
    return this.database.executeSql('DELETE FROM viaje WHERE id=?',[id])
    .then(()=>{
      this.cargarViajes();
    });
  }
  dbState(){
    return this.isDbReady.asObservable();
  }

  fetchViajes(): Observable<Viaje[]> {
    return this.listaViajes.asObservable();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 500
    });
    toast.present();
  }

  userViajes(conductor){
    return this.database.executeSql('SELECT * FROM  viaje WHERE conductor=?',[conductor])
    .then(res=>{
      let items:Viaje[]=[];
      if(res.rows.length>0){
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id:res.rows.item(i).id,
            conductor:res.rows.item(i).conductor,
            capacidad:res.rows.item(i).texto,
            destino:res.rows.item(i).destino,
            lng:res.rows.item(i).lng,
            lat:res.rows.item(i).lat
     
          });          
        }
      }
      this.listaViajesUser.next(items);
    });

  }

  fetchViajesUser(): Observable<Viaje[]> {
    return this.listaViajesUser.asObservable();
  }
}
