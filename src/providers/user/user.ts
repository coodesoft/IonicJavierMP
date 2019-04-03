import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ConfigProvider }      from '../config/config';
import { AuthProvider }        from '../auth/auth';
import { RespuestaAuthModule } from '../../models/respuesta.authmodule';

@Injectable()
export class UserProvider {

  public goSave   = new Subject();

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

  remove(id){
    this.http.post(this.configP.getConfigData().urlDeleteUser, {'id':id}, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
      data => { this.removeOK.next(data); }, err  => { this.removeKO.next(err);  }
    );
  }

  public enableOK = new Subject();
  public enableKO = new Subject();

  enable(id){
    this.http.post(this.configP.getConfigData().urlEnableUser, {'id':id}, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
      data => { this.enableOK.next(data); }, err  => { this.enableKO.next(err);  }
    );
  }

  public getAllOK = new Subject();
  public getAllKO = new Subject();
  private all_users:any = false;

  getAll(){
    //if(this.all_users){ return this.all_users; }
    this.http.post(this.configP.getConfigData().urlGetAllUser, '', { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
      data => { this.all_users = data; this.getAllOK.next(data); }, err  => { this.getAllKO.next(err);  }
    );
  }

  public getOneOK = new Subject();
  public getOneKO = new Subject();

  public getOne(id){
    //if (this.all_organizations){ return this.all_organizations; }
    this.http.post(this.configP.getConfigData().urlGetOneUser,{'id':id}, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
        data => { this.getOneOK.next(<RespuestaAuthModule> data); },
        err  => { this.getOneKO.next(err); }
      );
  }


  private preSend(model){

  }

  constructor(private configP: ConfigProvider, private auth:AuthProvider, private http:HttpClient) {}

}
