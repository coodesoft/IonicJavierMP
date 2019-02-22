import { Component } from '@angular/core';

import { ConfigProvider } from '../../providers/config/config';

declare var Mercadopago:any;

@Component({
  selector: 'mercado-pago-form',
  templateUrl: 'mercado-pago-form.html'
})
export class MercadoPagoFormComponent {

  doSubmit = false;

  constructor(
    private config: ConfigProvider
  ) {
    Mercadopago.setPublishableKey(this.config.getConfigData().MP_public_key);
    Mercadopago.getIdentificationTypes();

    //addEvent(document.querySelector('#pay'), 'submit', this.doPay);
  }

  guessingPaymentMethod(event) {
    /*var bin = getBin();

    if (event.type == "keyup") {
        if (bin.length >= 6) {
            Mercadopago.getPaymentMethod({
                "bin": bin
            }, setPaymentMethodInfo);
        }
    } else {
        setTimeout(function() {
            if (bin.length >= 6) {
                Mercadopago.getPaymentMethod({
                    "bin": bin
                }, setPaymentMethodInfo);
            }
        }, 100);
    }*/
  }

  setPaymentMethodInfo(status, response) {
    if (status == 200) {
        paymentMethod.setAttribute('name', "paymentMethodId");
        paymentMethod.setAttribute('type', "hidden");
        paymentMethod.setAttribute('value', response[0].id);

        form.appendChild(paymentMethod);
        } else {
            document.querySelector("input[name=paymentMethodId]").value = response[0].id;
        }
  }

  doPay(event){
      event.preventDefault();
      if(!doSubmit){
          var $form = document.querySelector('#pay');

          Mercadopago.createToken($form, sdkResponseHandler); // The function "sdkResponseHandler" is defined below

          return false;
      }
  }

  sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
        alert("verify filled data");
    }else{
        var form = document.querySelector('#pay');
        var card = document.createElement('input');
        card.setAttribute('name', 'token');
        card.setAttribute('type', 'hidden');
        card.setAttribute('value', response.id);
        form.appendChild(card);
        doSubmit=true;
        form.submit();
    }
  }

}
