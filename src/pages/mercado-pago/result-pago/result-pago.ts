import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NuevoPagoPage } from '../nuevo-pago/nuevo-pago';

@IonicPage()
@Component({
  selector: 'page-result-pago',
  templateUrl: 'result-pago.html',
})
export class ResultPagoPage {

  public codigo:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.codigo = this.navParams.get('pago_id');
  }

  nuevoPago(){
    this.navCtrl.push(NuevoPagoPage);
  }

}
