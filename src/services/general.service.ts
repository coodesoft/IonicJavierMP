//Este componente tiene como finalida centralizar todas las funciones comunes
//que utilizarían todas las páginas, como los mensajes de alerta, loadings, etc.
// Esto es asi, por que al parecer no es una practica buena extender páginas en Angular
import {Injectable} from '@angular/core';

import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class GeneralService {

  private loading;

  constructor(
    public toastCtrl:   ToastController,
    public loadingCtrl: LoadingController
  ) { }

  newMensaje(t){
    const toast = this.toastCtrl.create({
      message: t, showCloseButton: true, duration:3000, closeButtonText: 'Ok'
    });
    toast.present();
  }

  presentLoading(d=0){
    let conf = { content: 'Por favor espere...', dismissOnPageChange: false};
    if (d!=0) { conf['duration'] = d; conf['dismissOnPageChange'] = true; }
    this.loading = this.loadingCtrl.create(conf);
    this.loading.present();
  }
  dismissLoading(){ if(this.loading){ this.loading.dismiss();}  }

  errMsg(err){
    switch (err.status){
      case 401:{
        this.newMensaje('No está autorizado para obtener esta información');
        break;
      }
      case 404:{
        this.newMensaje('Ha ocurrido un error interno, vuelva a intentar mas tarde.');
        break;
      }
      case 500:{
        this.newMensaje('Ha ocurrido un error interno, vuelva a intentar mas tarde.');
        break;
      }
    }
  }
}
