import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor() { }
isAuthenticated(){
    if(localStorage.getItem('Token')=='true'){
      return this.isLoggedIn=true;
    }
  
  }
}