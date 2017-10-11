import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {CategoriePage} from "../pages/categorie/categorie";
import {MalistedecoursePage} from "../pages/malistedecourse/malistedecourse";
import { MescouponsPage } from "../pages/mescoupons/mescoupons";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  pages2: any;
  activePage: any;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Ma liste de courses', component: MalistedecoursePage, },
      { title: 'supermarches', component: CategoriePage },
      { title: 'Mes coupons', component: MescouponsPage }
    ];
    this.pages2 = {
      MalistedecoursePage: MalistedecoursePage,
      CategoriePage: CategoriePage,
      MescouponsPage: MescouponsPage,
    }
    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }
}
