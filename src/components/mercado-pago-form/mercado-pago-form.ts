import { Component } from '@angular/core';

import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'mercado-pago-form',
  templateUrl: 'mercado-pago-form.html'
})
export class MercadoPagoFormComponent {

  constructor(
    private config: ConfigProvider
  ) {
    Mercadopago.setPublishableKey(this.config.getConfigData().MP_public_key);console.log(this.config.getConfigData().MP_public_key);
  }

}
