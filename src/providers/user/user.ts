import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ConfigProvider }      from '../config/config';
import { AuthProvider }        from '../auth/auth';

@Injectable()
export class UserProvider {

  public createOK = new Subject();
  public createKO = new Subject();

  create(model){
    this.http.post(this.configP.getConfigData().urlNewUser, model, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
      data => { this.createOK.next(data); }, err  => { this.createKO.next(err);  }
    );
  }

  public editOK = new Subject();
  public editKO = new Subject();

  edit(model){
    this.http.post(this.configP.getConfigData().urlEditUser, model, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
      data => { this.editOK.next(data); }, err  => { this.editKO.next(err);  }
    );
  }

  public removeOK = new Subject();
  public removeKO = new Subject();

  remove(model){
    this.http.post(this.configP.getConfigData().urlDeleteUser, model, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
      data => { this.removeOK.next(data); }, err  => { this.removeKO.next(err);  }
    );
  }

  public getAllOK = new Subject();
  public getAllKO = new Subject();

  getAll(){
    this.http.post(this.configP.getConfigData().urlGetAllUser, '', { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
      data => { this.getAllOK.next(data); }, err  => { this.getAllKO.next(err);  }
    );
  }

  private preSend(model){

  }

  constructor(private configP: ConfigProvider, private auth:AuthProvider, private http:HttpClient) {}

}
