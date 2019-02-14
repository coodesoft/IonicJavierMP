import { Component } from '@angular/core';
import { Storage }   from '@ionic/storage';

@Component({
  selector: 'user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoComponent {

  name: string;

  constructor(
  	private storage: Storage
  ) {
  	this.storage.get('LOGIN').then((val) => {
    	this.name = val['personal_data']['FirstName'] + ' ' +val['personal_data']['LastName'];
    });
    
  }

}
