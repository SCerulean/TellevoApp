import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ARcrede } from '../interfaces/viaje';
@Injectable({
  providedIn: 'root'
})
export class LrouteService {

  constructor(private http:HttpClient) { }

  getCredenciales()
  {
    return this.http.get<ARcrede>(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  }
}
