import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ClientePage } from '../cliente/cliente';
import { CupomPage } from '../cupom/cupom';
import { RegulamentoPage } from '../regulamento/regulamento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  public navegar(page) {
    if(page === "cliente") {
      this.navCtrl.push(ClientePage);
    }

    if(page === "cupom") {
      this.navCtrl.push(CupomPage);
    }

    if(page === "regulamento") {
      this.navCtrl.push(RegulamentoPage);
    }
  }
}
