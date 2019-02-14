var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Events, ViewController, NavParams } from 'ionic-angular';
/**
 * Generated class for the SearchSelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SearchSelectComponent = /** @class */ (function () {
    function SearchSelectComponent(events, viewCtrl, navParams) {
        this.events = events;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.filteredOcupaciones = [];
        this.storedOcupaciones = [];
        this.storedOcupaciones = this.navParams.get('ocupacionesList');
        this.filteredOcupaciones = this.storedOcupaciones;
    }
    SearchSelectComponent.prototype.onInput = function (searchBar) {
        var value = searchBar.srcElement.value;
        if (value) {
            value = value.toLowerCase();
            this.filteredOcupaciones = this.storedOcupaciones.filter(function (codigo) {
                var descripcion = codigo.Descripcion.toLowerCase();
                return (descripcion.indexOf(value) > -1);
            });
        }
        else
            this.filteredOcupaciones = this.storedOcupaciones;
    };
    SearchSelectComponent.prototype.sendOcupation = function () {
        var param = JSON.stringify({ 'ocupation': this.selectedOcupation, 'index': this.navParams.get('index') });
        this.events.publish("ocupacionField", param);
        this.closeSearchPage();
    };
    SearchSelectComponent.prototype.directSelect = function () {
        this.sendOcupation();
        this.closeSearchPage();
    };
    SearchSelectComponent.prototype.closeSearchPage = function () {
        this.viewCtrl.dismiss();
    };
    SearchSelectComponent = __decorate([
        Component({
            selector: 'search-select',
            templateUrl: 'search-select.html'
        }),
        __metadata("design:paramtypes", [Events,
            ViewController,
            NavParams])
    ], SearchSelectComponent);
    return SearchSelectComponent;
}());
export { SearchSelectComponent };
//# sourceMappingURL=search-select.js.map