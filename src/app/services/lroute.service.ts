import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credenciales, respuestaCredenciales } from '../interfaces/viaje';
@Injectable({
  providedIn: 'root'
})
export class LrouteService {

  constructor(private http:HttpClient) { }

  getCredenciales()
  {
    return this.http.get<respuestaCredenciales>(`https://nancyb3a.github.io/Test/usuarios_PGY4121_03.json`);
  }


  getCredenciales2()
  {
    return this.http.get<Credenciales>(`https://nancyb3a.github.io/Test/usuarios_PGY4121_03.json`);
  }

}
