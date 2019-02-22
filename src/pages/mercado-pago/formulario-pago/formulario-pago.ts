import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../../providers/config/config';
import { Pago }           from '../../../models/pago';
declare var Mercadopago:any;

@IonicPage()
@Component({
  selector: 'page-formulario-pago',
  templateUrl: 'formulario-pago.html',
})
export class FormularioPagoPage {

  @ViewChild('cardNumber') private cardNumber: ElementRef;

  pago_model:Pago = new Pago();

  private bin:string = '';
  private form:any   = {};

  constructor(
    public navCtrl:   NavController,
    public navParams: NavParams,
    private config:   ConfigProvider)
  {}

  guessingPaymentMethod() {
    this.bin = this.getBin();
    if (this.bin.length >= 6) {
        Mercadopago.getPaymentMethod({
            "bin": this.bin
        }, (status, response)=>{
          this.pago_model.paymentMethodId = response[0].id;
        });
    }
  }
//4509 9535 6623 3704
  getBin() { return this.cardNumber._value.replace(/[ .-]/g, '').slice(0, 6); }

  doPay(){
      this.form = document.querySelector('#pay');
      Mercadopago.createToken(this.form, this.sdkResponseHandler);
  }

  sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
        alert("verify filled data");
        console.log(response);
    }else{
        this.form = document.querySelector('#pay');
        let card = document.createElement('input');
        card.setAttribute('name', 'token');
        card.setAttribute('type', 'hidden');
        card.setAttribute('value', response.id);
        this.form.appendChild(card);
        console.log(card);
    }
  }

  ionViewDidLoad() {
    Mercadopago.setPublishableKey(this.config.getConfigData().MP_public_key);
    Mercadopago.getIdentificationTypes();
  }

}
