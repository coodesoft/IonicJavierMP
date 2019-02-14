import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';

import { ConfigProvider } from '../config/config';

@Injectable()
export class AuthProvider { //[Modificar] este modulo tendría que centralizar la lógica por sobre la página Login

  urlLogin:string;
  urlReset:string;
  urlUpdatePass:string;

  config:any;
  userData:any;

  constructor(
    private http :   HttpClient,
    private storage: Storage,
    private configP: ConfigProvider
  ) {
    storage.get('CONFIG').then((val) => {
      this.config        = val;
      this.urlLogin      = this.config["urlAuthLogin"];
      this.urlReset      = this.config["urlAuthReset"];
      this.urlUpdatePass = this.config["urlAuthUpdatePass"];
    });
  }

  public login(dataLogin){
    return this.http.post(this.urlLogin, dataLogin);
  }

  public resetPass(user){
    return this.http.post(this.urlReset, user);
  }

  public updatePass(data,s,e){
    this.storage.get('LOGIN').then((val) => {
      this.userData = val;

      this.http.post(this.urlUpdatePass, data,{
          headers: new HttpHeaders(
            {'Content-Type':'application/json',
             'Token':this.userData.token})}).subscribe(s,e);
    });
  }

  public codeInFuntions(code){
    for (let fc=0;fc<this.userData.functions.length;fc++){
      if (this.userData.functions[fc]["code"] == code){return true; }
    }
    return false;
  }
}
