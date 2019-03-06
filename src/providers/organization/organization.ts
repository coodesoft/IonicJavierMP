import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { ConfigProvider }      from '../config/config';
import { AuthProvider }        from '../auth/auth';
import { RespuestaAuthModule } from '../../models/respuesta.authmodule';

@Injectable()
export class OrganizationProvider {

  constructor(
    private http:    HttpClient,
    private configP: ConfigProvider,
    private auth:    AuthProvider
  ) {}

  public getAllOK = new Subject();
  public getAllKO = new Subject();

  public getAll(model){
    this.http.post(this.configP.getConfigData().urlGetAllOrganizations, model, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
        data => {
          this.roles_listed = (<RespuestaAuthModule> data).result.roles;
          this.getAllOK.next(<RespuestaAuthModule> data); },

        err => { this.getAllKO.next(err); }
      );
  }

  private roles_listed:any = {};
}
