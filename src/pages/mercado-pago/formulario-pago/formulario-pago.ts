import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../../providers/config/config';
import { ResultPagoPage } from '../result-pago/result-pago';
import { PagoProvider   } from '../../../providers/pago/pago';
import { Pago }           from '../../../models/pago';
import { RespuestaAuthModule } from '../../../models/respuesta.authmodule';
import { GeneralService } from '../../../services/general.service';
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

  private processPagoOK;
  private processPagoKO;

  constructor(
    private navCtrl: NavController,  private navParams: NavParams,
    private config:  ConfigProvider, private pagoProv:  PagoProvider,
    private gral:    GeneralService
  ){}

  guessingPaymentMethod() {
    this.bin = this.getBin();
    if (this.bin.length >= 6) {
        Mercadopago.getPaymentMethod({
            "bin": this.bin
        }, (status, response) => {
          if (response[0]){
            this.pago_model.paymentMethodId = response[0].id;
          } else {
            this.gral.newMensaje('Revise el número de tarjeta.');
          }
      });
    }
  }
//4509 9535 6623 3704
  getBin() { return this.cardNumber['_value'].replace(/[ .-]/g, '').slice(0, 6); }

  doPay(){
      this.form = document.querySelector('#pay');
      let obj = this;
      Mercadopago.createToken(this.form, (status, response) => {
        this.gral.dismissLoading();
        if (status != 200 && status != 201) {
          this.gral.newMensaje('Revise el formulario.');
        }else{
            obj.pago_model.token = response.id;
            Mercadopago.clearSession();
            obj.gral.presentLoading();
            obj.pagoProv.processPago(obj.pago_model);
        }
      });
  }

  ionViewDidEnter(){
    this.processPagoOK = this.pagoProv.processPagoOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
      if ( r.result.success ){ this.navCtrl.push(ResultPagoPage, { pago_id:r.result.id_pago }); } else {
          this.gral.newMensaje('Ocurrió un error al intentar procesar el pago.');
      }
    } });

    this.processPagoKO = this.pagoProv.processPagoKO.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.errMsg(r);
      this.gral.dismissLoading();
    } });
  }

  ionViewDidLeave(){
    this.processPagoOK.unsubscribe();
    this.processPagoKO.unsubscribe();
  }

  ionViewDidLoad() {
    this.pago_model = this.navParams.get('pago_model');
    Mercadopago.setPublishableKey(this.config.getConfigData().MP_public_key);
    Mercadopago.getIdentificationTypes();
  }

}
