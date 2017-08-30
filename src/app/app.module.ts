import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SupermarcheapiService } from "../services/supermarcheapi.service";
import { HttpModule } from "@angular/http";
import { Geolocation } from "@ionic-native/geolocation";
import {GeolocalisationPage} from "../pages/geolocalisation/geolocalisation";
import {LoginService} from "../services/login.service";
import {MapPage} from "../pages/map/map";
import { GoogleMaps } from "@ionic-native/google-maps";
import {CategoriePage} from "../pages/categorie/categorie";
import {ProduitPage} from "../pages/produit/produit";




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GeolocalisationPage,
    MapPage,
    CategoriePage,
    ProduitPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GeolocalisationPage,
    MapPage,
    CategoriePage,
    ProduitPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SupermarcheapiService,
    LoginService,
    GoogleMaps,
    Geolocation,
  ]
})
export class AppModule {}
