import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage }    from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Config } from '../../models/config';

@Injectable()
export class ConfigProvider {

  private config:Config = new Config();

  public configLoaded = new BehaviorSubject<boolean>(false);

  private urlConfig = 'assets/config/config.json';

  constructor(
  	public http:     HttpClient,
  	private storage: Storage,
  ) {}

  public getConfigData(){
  	return this.config;
  }

  public loadConfig(){
    if (this.config.loaded){
      return true;
    }

  	this.getConfig().subscribe(data => {
      this.config = <Config> data;
      this.storage.set('CONFIG', data);
      this.config.loaded = true;
      this.configLoaded.next(true);
    }
    , err =>{
      console.log('Error al obtener la configuración!');
      this.loadConfig();
    });
  }

  public getConfig(){
    return this.http.get(this.urlConfig);
  }
}
