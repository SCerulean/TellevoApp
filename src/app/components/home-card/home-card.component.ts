import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BDviajeService } from 'src/app/services/bdviaje.service';
import { Viaje } from 'src/app/interfaces/viaje';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {


  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Please enter your info',
      inputs: [
        {
          name : 'txtnombre',
          type: 'text',
          placeholder: 'Name',
        },
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Pasajeros'
        },
        {
          name: 'destino',
          type: 'text',
          placeholder: 'destino'
        },
      ],
      buttons: [
        {
          text: 'OK',
          handler:(data) => {
            console.log(data)
          }
        }
      ],
    });

    await alert.present();
  }

  

}