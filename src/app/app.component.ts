import { Nav, Platform, MenuController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Events } from 'ionic-angular';

import { StatusBar }            from '@ionic-native/status-bar';
import { SplashScreen }         from '@ionic-native/splash-screen';

import { HomePage }                from '../pages/home/home';
import { LoginPage }               from '../pages/login/login';
import { ActualizacionPerfilPage } from '../pages/actualizacion-perfil/actualizacion-perfil';

// Side Menu Component
import { SideMenuContentComponent } from './../shared/side-menu-content/side-menu-content.component';
import { SideMenuSettings }         from './../shared/side-menu-content/models/side-menu-settings';
import { MenuOptionModel }          from './../shared/side-menu-content/models/menu-option-model';

import { ConfigProvider }       from '../providers/config/config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;

  @ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

  public rootPage: any = LoginPage;

  public options: Array<MenuOptionModel>;

  public sideMenuSettings: SideMenuSettings = {
		accordionMode:        true,
		showSelectedOption:   true,
		selectedOptionClass:  'active-side-menu-option',
		subOptionIndentation: {
			md:  '56px',
			ios: '64px',
			wp:  '56px'
		}
	};

  constructor(
    public platform:        Platform,
    public statusBar:       StatusBar,
    public splashScreen:    SplashScreen,
		private menuCtrl:       MenuController,
    private configProvider: ConfigProvider,
    public events:          Events
  ) {
    this.initializeConfig();
    this.initializeApp();

    events.subscribe('user:logedIn', (user) => {
      this.initializeMenuOptions(user.functions,user);
    });
  }

  initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleLightContent();
			this.splashScreen.hide();
		});

	}

  codeInFuntions(code,functions){
    for (let fc=0;fc<functions.length;fc++){
      if (functions[fc]["code"] == code){return true; }
    }
    return false;
  }

  private initializeMenuOptions(functions,user): void {
    let temp:any;
    this.options = new Array<MenuOptionModel>();

    this.options.push({
			iconName: 'home',	displayName: 'Inicio',	component: HomePage, selected: true
		});

		if(this.codeInFuntions('MiPer',functions)){
      temp = { displayName: 'Personal', subItems: [] };

      temp.subItems.push({	iconName: 'person',	displayName: 'Mi perfil',	component: ActualizacionPerfilPage });

      this.options.push(temp);
    }

  	this.options.push({
			displayName: 'Sesión',
			subItems: [
				{
					iconName: 'log-out',
          displayName: 'Cerrar sesión',
					custom: {	isLogout: true }
				}
			]
		});
	}


	public selectOption(option: MenuOptionModel): void {
		this.menuCtrl.close().then(() => {
			if (option.custom && option.custom.isLogin) {
				this.presentAlert('You\'ve clicked the login option!');
			} else if (option.custom && option.custom.isLogout) {
				this.presentAlert('You\'ve clicked the logout option!');
			} else if (option.custom && option.custom.isExternalLink) {
				let url = option.custom.externalUrl;
				window.open(url, '_blank');
			} else {
				// Redirect to the selected page
				this.navCtrl.setRoot(option.component, { 'title': option.displayName });
			}
		});
	}

	public collapseMenuOptions(): void {
		this.sideMenu.collapseAllOptions();
	}

	public presentAlert(message: string): void {
		this.navCtrl.setRoot(LoginPage);
	}

  public initializeConfig(): void {
    this.configProvider.loadConfig();
    this.configProvider.configLoaded.subscribe({  next: (v) => {
      if(v) {
        this.initializeCodigos();
      }
    } });
  }

  public initializeCodigos(): void{
  }
}
