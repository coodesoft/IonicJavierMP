import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpresaAdmPage } from './empresa-adm';

@NgModule({
  declarations: [
    EmpresaAdmPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresaAdmPage),
  ],
})
export class EmpresaAdmPageModule {}
