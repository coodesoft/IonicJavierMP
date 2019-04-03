import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { ConfigProvider }      from '../config/config';
import { AuthProvider }        from '../auth/auth';
import { RespuestaAuthModule } from '../../models/respuesta.authmodule';

@Injectable()
export class OrganizationProvider {

  constructor(
    private http:         HttpClient,
    private configP:      ConfigProvider,
    private auth:         AuthProvider
  ) {}

  public goSave   = new Subject();

  public getAllOK = new Subject();
  public getAllKO = new Subject();

  public all_organizations:any = false;

  public getAll(noCache:boolean = false){
    if (this.all_organizations && !noCache){ this.getAllOK.next(this.all_organizations); return true; }
    this.http.post(this.configP.getConfigData().urlGetAllOrganizations,'', { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
        data => {
          this.all_organizations = (<RespuestaAuthModule> data).result.organizations; this.getAllOK.next(this.all_organizations); },

        err => { this.getAllKO.next(err); }
      );
  }

  public getOneOK = new Subject();
  public getOneKO = new Subject();

  public getOne(id){
    //if (this.all_organizations){ return this.all_organizations; }
    this.http.post(this.configP.getConfigData().urlGetOneOrganization,{'id':id}, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
        data => { this.getOneOK.next(<RespuestaAuthModule> data); },
        err  => { this.getOneKO.next(err); }
      );
  }

  public createOK = new Subject();
  public createKO = new Subject();

  create(model){
    this.http.post(this.configP.getConfigData().urlNewOrganization, model, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
      data => { this.createOK.next(data); }, err  => { this.createKO.next(err);  }
    );
  }

  public editOK = new Subject();
  public editKO = new Subject();

  edit(model){
    this.http.post(this.configP.getConfigData().urlEditOrganization, model, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
      data => { this.editOK.next(data); }, err  => { this.editKO.next(err);  }
    );
  }

  public removeOK = new Subject();
  public removeKO = new Subject();

  remove(id){
    this.http.post(this.configP.getConfigData().urlDeleteOrganization, {'id':id}, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
      data => { this.removeOK.next(data); }, err  => { this.removeKO.next(err);  }
    );
  }

  public enableOK = new Subject();
  public enableKO = new Subject();

  enable(id){
    this.http.post(this.configP.getConfigData().urlEnableOrganization, {'id':id}, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
      data => { this.enableOK.next(data); }, err  => { this.enableKO.next(err);  }
    );
  }

  clearCache(){
    this.all_organizations = false;
  }

}
