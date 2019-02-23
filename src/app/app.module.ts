import { BrowserModule }                            from '@angular/platform-browser';
import { ErrorHandler, NgModule }                   from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule }                         from '@angular/common/http';
import { IonicStorageModule }                       from '@ionic/storage';

import { MyApp }                   from './app.component';

import { HomePage }                from '../pages/home/home';
import { LoginPage }               from '../pages/login/login';
import { ActualizacionPerfilPage } from '../pages/actualizacion-perfil/actualizacion-perfil';

import { PerfilesUsuariosPage }    from '../pages/perfiles-usuarios/perfiles-usuarios';
import { ResetPassPage }           from '../pages/reset-pass/reset-pass';
import { ErrorPage }               from '../pages/error/error';

import { NuevoPagoPage }      from '../pages/mercado-pago/nuevo-pago/nuevo-pago';
import { FormularioPagoPage } from '../pages/mercado-pago/formulario-pago/formulario-pago';
import { ResultPagoPage }     from '../pages/mercado-pago/result-pago/result-pago';
import { UserAdmPage }        from '../pages/user/user-adm/user-adm';

import { StatusBar }    from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';
import { SearchSelectComponent }    from '../shared/search-select/search-select';

import { AuthProvider }        from '../providers/auth/auth';
import { ConfigProvider }      from '../providers/config/config';

import { FormateoService } from '../services/formateo.service';
import { B64toPDFService } from '../services/64to-pdf.service';
import { GeneralService }  from '../services/general.service';

//Importación de componentes
import { UserInfoComponent }      from '../components/user-info/user-info';
import { ModalUserFormComponent } from '../components/modal-user-form/modal-user-form';

import { BrowserAnimationsModule}                         from '@angular/platform-browser/animations';
import { MatSelectModule }                                from '@angular/material/select';
import { MatNativeDateModule,MatInputModule, MatFormFieldModule } from '@angular/material';
import { MatDatepickerModule}                             from '@angular/material/datepicker';
import { MomentDateAdapter}                               from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatAutocompleteModule }                          from '@angular/material/autocomplete';
import { MatTableModule }                                 from '@angular/material/table';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { PagoProvider } from '../providers/pago/pago';
import { UserProvider } from '../providers/user/user';

const moment = _rollupMoment || _moment;

export const YYYY_MM_DD_Format = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY MMM',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY MMMM',
    },
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NuevoPagoPage, FormularioPagoPage, ResultPagoPage,
    ModalUserFormComponent, UserAdmPage,
    LoginPage, ResetPassPage, UserInfoComponent, PerfilesUsuariosPage,
    ActualizacionPerfilPage,
    ErrorPage,
    SideMenuContentComponent, SearchSelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    MatNativeDateModule,MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatAutocompleteModule, MatTableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NuevoPagoPage, FormularioPagoPage, ResultPagoPage,
    ModalUserFormComponent, UserAdmPage,
    LoginPage, UserInfoComponent, ResetPassPage, PerfilesUsuariosPage,
    ActualizacionPerfilPage,
    ErrorPage,
    SearchSelectComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler,     useClass: IonicErrorHandler },
    { provide: DateAdapter,      useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: YYYY_MM_DD_Format },
    AuthProvider,  ConfigProvider,
    GeneralService, B64toPDFService, FormateoService,
    PagoProvider,
    UserProvider
  ]
})
export class AppModule {}
