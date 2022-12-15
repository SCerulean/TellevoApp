import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-detection',
  templateUrl: './detection.page.html',
  styleUrls: ['./detection.page.scss'],
})
export class DetectionPage implements OnInit {

  constructor() { }

  ngOnInit() {
    const $detection = document.getElementById("detection")

    if(this.isMovil.any()){
      console.log(this.detec);
      
      
      $detection.innerHTML = `<a href='https://drive.google.com/u/1/uc?id=1iZa7nkE3i6Le2u1hLkQZhsm3-_tFw1SW&export=download'> descarga la app </a>`
    }
    else if (this.isPC.any){
      console.log(this.detec);
      $detection.innerHTML = `  
      <label> Escanea el QR Y descarga la app </label>
      <hr>
      <hr>
      <ion-img src="../../../assets/img/frame.png" alt="..."  width="100px" height="100px"></ion-img>`
    
    }
  
    
    
  }
 
  detec = navigator.userAgent;
  
 isMovil = {
  android: () =>  this.detec.match(/android/i),
  ios: () =>  this.detec.match(/iphone|ipad|ipod/i),
  any: function(){
    return this.android()||this.ios();
  }
};

  isPC = {
    windows: () =>  this.detec.match(/windows/i),
    mac: () =>  this.detec.match(/mac os/i),
    linux: () =>  this.detec.match(/linux/i),
    any: function(){
      return this.windows()||this.mac()||this.linux();

  }
};

 }

