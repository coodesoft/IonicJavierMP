import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { ConfigProvider }      from '../config/config';
import { AuthProvider }        from '../auth/auth';
import { RespuestaAuthModule } from '../../models/respuesta.authmodule';
import { FormateoService }     from '../../services/formateo.service';

@Injectable()
export class PagoProvider {

  constructor(
    private http:    HttpClient,
    private configP: ConfigProvider,
    private auth:    AuthProvider,
    private format:  FormateoService
  ) {}

  public newPagoOK = new Subject();
  public newPagoKO = new Subject();

  public newPago(model){
    model.monto = this.format.unFormatMoney(model.monto);
    this.http.post(this.configP.getConfigData().urlNewPago, model, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
        data => { this.newPagoOK.next(<RespuestaAuthModule> data); }, err => { this.newPagoKO.next(err); }
      );
  }

  public processPagoOK = new Subject();
  public processPagoKO = new Subject();

  public processPago(model){
    this.http.post(this.configP.getConfigData().urlProcessPago, model, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
        data => { this.processPagoOK.next(<RespuestaAuthModule> data); }, err => { this.processPagoKO.next(err); }
      );
  }

}
