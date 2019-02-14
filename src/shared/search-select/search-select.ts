import { Component } from '@angular/core';

import { Events, ViewController, NavParams} from 'ionic-angular';


/**
 * Generated class for the SearchSelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'search-select',
  templateUrl: 'search-select.html'
})

export class SearchSelectComponent {

  sarchText: string;
  filteredOcupaciones : any = [];
  storedOcupaciones : any = [];
  selectedOcupation : any;

  constructor( public events : Events,
               public viewCtrl: ViewController,
               public navParams : NavParams) {
     this.storedOcupaciones = this.navParams.get('ocupacionesList');
     this.filteredOcupaciones = this.storedOcupaciones;

  }



  onInput(searchBar : any) {
    var value = searchBar.srcElement.value;
    if (value){
      value = value.toLowerCase();
      this.filteredOcupaciones = this.storedOcupaciones.filter((codigo) => {
        var descripcion = codigo.Descripcion.toLowerCase();
        return (descripcion.indexOf(value) > -1);
      })
    } else
      this.filteredOcupaciones = this.storedOcupaciones;
  }

  sendOcupation(){
    var param = JSON.stringify({'ocupation' : this.selectedOcupation, 'index' : this.navParams.get('index')});
    this.events.publish("ocupacionField", param);
    this.closeSearchPage();
  }

  directSelect(){
    this.sendOcupation();
    this.closeSearchPage();
  }

  closeSearchPage(){
    this.viewCtrl.dismiss();
  }

}
