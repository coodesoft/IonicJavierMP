//Este provider se usa para el manejo generalizado de peticiones que utilizen los subjects
//y el archivo de configuración
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Subject }    from 'rxjs/Subject';

@Injectable()
export class RequestComponent {

  constructor(private configP: any, private auth:any) { }

  private http = HttpClient;

  public resultOK = new Subject();
  public resultKO = new Subject();

  private method:string = 'post';
  private url:string    = '';

  send(model){
    let cfgSubscript = this.configP.configLoaded.subscribe({  next: (r) => {

      this.http[this.method](this.configP.getConfigData()[this.url], model, { headers: new HttpHeaders({ 'Authorization': this.auth.userData.token }) }).subscribe(
        data => {
          this.resultOK.next(data);
        },
        err => {
          this.resultKO.next(err);
        }
      );
    } });
    this.configP.loadConfig();
    cfgSubscript.unsubscribe();
  }

  setConfig(conf){
    this.url    = conf.url;
    this.method = conf.method;
  }
}
