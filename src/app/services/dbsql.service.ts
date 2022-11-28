import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehiculo, Viaje } from '../clases/viaje';

@Injectable({
  providedIn: 'root'
})
export class dbsqlservice {

  public database: SQLiteObject;
  tblViajes:string = "CREATE TABLE IF NOT EXISTS viaje(id INTEGER PRIMARY KEY autoincrement, conductor VARCHAR(50) NOT NULL, capacidad INTEGER NOT NULL,precio INTEGER NOT NULL, destino VARCHAR(100) NOT NULL,contacto VARCHAR(50) NOT NULL, lng REAL NOT NULL, lat REAL NOT NULL ); ";
  tblVehiculo:string = "CREATE TABLE IF NOT EXISTS vehiculo(patente VARCHAR(50) PRIMARY KEY,capacidad INTEGER NOT NULL,nombre VARCHAR(50),dueno VARCHAR(50) NOT NULL) ;"
  listaViajes = new BehaviorSubject([]);
  listaViajesUser = new BehaviorSubject([]);
  listaVehiculoUser = new BehaviorSubject([]);
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
      await this.database.executeSql(this.tblVehiculo,[]);
      this.cargarViajes();
      this.isDbReady.next(true); 
    } catch (error) {
      this.presentToast("Error en Crear Tabla: "+error);
    }
  }

  //Devuelve todos los viajes
  cargarViajes() {
    return this.database.executeSql('SELECT * FROM viaje',[])
    .then(res=>{
      let items:Viaje[]=[];
      if(res.rows.length>0){
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id:res.rows.item(i).id,
            conductor:res.rows.item(i).conductor,
            capacidad:res.rows.item(i).capacidad,
            precio:res.rows.item(i).precio,
            destino:res.rows.item(i).destino,
            contacto:res.rows.item(i).contacto,
            lng:res.rows.item(i).lng,
            lat:res.rows.item(i).lat,
    
          });          
        }
      }
      this.listaViajes.next(items);
    });
  }


  addViaje(conductor,capacidad,precio,destino,contacto,lng,lat){
    let data=[conductor,capacidad,precio,destino,contacto,lng,lat];
    return this.database.executeSql('INSERT INTO viaje(conductor,capacidad,precio,destino,contacto,lng,lat) VALUES(?,?,?,?,?,?,?)',data)
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


  //METODOS SOLO PARA EL USER

  //devuelve todos los viajes del usuario 
  userViajes(conductor){
    return this.database.executeSql('SELECT * FROM  viaje WHERE conductor=?',[conductor])
    .then(res=>{
      let items:Viaje[]=[];
      if(res.rows.length>0){
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id:res.rows.item(i).id,
            conductor:res.rows.item(i).conductor,
            capacidad:res.rows.item(i).capacidad,
            precio:res.rows.item(i).precio,
            destino:res.rows.item(i).destino,
            contacto:res.rows.item(i).contacto,
            lng:res.rows.item(i).lng,
            lat:res.rows.item(i).lat,
        
     
          });          
        }
      }
      this.listaViajesUser.next(items);
    });

  }

  fetchViajesUser(): Observable<Viaje[]> {
    return this.listaViajesUser.asObservable();
  }

//SQL METODOS VEHICULOS


addVehiculo(patente,capacidad,nombre,dueno){
  let data=[patente,capacidad,nombre,dueno];
  return this.database.executeSql('INSERT INTO vehiculo(patente,capacidad,nombre,dueno) VALUES(?,?,?,?)',data)
  .then(()=>{
    this.userVehiculos(dueno);
  });
}

 
deleteVehiculo(patente,dueno){
  return this.database.executeSql('DELETE FROM vehiculo WHERE patente=?',[patente])
  .then(()=>{
    this.userVehiculos(dueno);
  });
}

//devuelve los vehiculos del usuario
  userVehiculos(dueno){
    return this.database.executeSql('SELECT * FROM  vehiculo WHERE dueno=?',[dueno])
    .then(res=>{
      let items:Vehiculo[]=[];
      if(res.rows.length>0){
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            patente:res.rows.item(i).patente,
            capacidad:res.rows.item(i).capacidad,
            nombre:res.rows.item(i).nombre,
            dueno:res.rows.item(i).dueno
     
          });          
        }
      }
      this.listaVehiculoUser.next(items);
    });
  
  }
  
  fetchVehiculoUser(): Observable<Vehiculo[]> {
    return this.listaVehiculoUser.asObservable();
  }


  //toast
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 500
    });
    toast.present();
  }
  
}

