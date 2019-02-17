import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoPagoPage } from './nuevo-pago';

@NgModule({
  declarations: [
    NuevoPagoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoPagoPage),
  ],
})
export class NuevoPagoPageModule {}
