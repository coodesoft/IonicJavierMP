import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { ConfigProvider }      from '../config/config';
import { AuthProvider }        from '../auth/auth';
import { RespuestaAuthModule } from '../../models/respuesta.authmodule';

@Injectable()
export class PagoProvider {

  constructor(
    private http:    HttpClient,
    private configP: ConfigProvider,
    private auth:    AuthProvider
  ) {}

  public newPagoOK = new Subject();
  public newPagoKO = new Subject();

  public newPago(model){
    let cfgSubscript = this.configP.configLoaded.subscribe({  next: (r) => {

      this.http.post(this.configP.getConfigData().urlNewPago, model, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
        data => {
          this.newPagoOK.next(<RespuestaAuthModule> data);
        },
        err => {
          this.newPagoKO.next(err);
        }
      );
    } });
    this.configP.loadConfig();
    cfgSubscript.unsubscribe();
  }
}
