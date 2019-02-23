import { Component } from '@angular/core';

/**
 * Generated class for the ModalUserFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-user-form',
  templateUrl: 'modal-user-form.html'
})
export class ModalUserFormComponent {

  text: string;

  constructor() {
    console.log('Hello ModalUserFormComponent Component');
    this.text = 'Hello World';
  }

}
