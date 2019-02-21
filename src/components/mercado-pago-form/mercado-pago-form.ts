import { Component } from '@angular/core';

@Component({
  selector: 'mercado-pago-form',
  templateUrl: 'mercado-pago-form.html'
})
export class MercadoPagoFormComponent {

  text: string;

  constructor() {
    console.log('Hello MercadoPagoFormComponent Component');
    this.text = 'Hello World';
  }

}
