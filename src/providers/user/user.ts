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

  constructor(private configP: ConfigProvider, private auth:AuthProvider, private http:HttpClient) {}

}
