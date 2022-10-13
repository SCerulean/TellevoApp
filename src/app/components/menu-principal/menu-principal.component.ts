import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent implements OnInit {

  constructor(private menu: MenuController) {


  
  }

  onClick() {
    this.menu.toggle();
  }
  ngOnInit() {}

}
