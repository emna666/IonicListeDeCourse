import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";
import { Geolocation } from "@ionic-native/geolocation";
import { GoogleMaps } from "@ionic-native/google-maps";

/**Declaration services**/
import {LoginService} from "../services/login.service";
import { SupermarcheapiService } from "../services/supermarcheapi.service";
import {mesProduitsapiService} from "../services/mesproduitsapi.service";
import { mesCouponsapiService } from "../services/mescouponsapi.service";
import { couponsbyproductService } from "../services/couponsbyproduct.service";
import {ProduitapiService} from "../services/produitapi.service";


/**Declaration page**/
import { HomePage } from '../pages/home/home';
import {MapPage} from "../pages/map/map";
import {GeolocalisationPage} from "../pages/geolocalisation/geolocalisation";
import { CategoriePage } from "../pages/categorie/categorie";
import {ProduitPage} from "../pages/produit/produit";
import {MalistedecoursePage} from "../pages/malistedecourse/malistedecourse";
import {MescouponsPage} from "../pages/mescoupons/mescoupons";
import {CouponsproduitPage} from "../pages/couponsproduit/couponsproduit";




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GeolocalisationPage,
    MapPage,
    CategoriePage,
    MalistedecoursePage,
    MescouponsPage,
    ProduitPage,
    CouponsproduitPage
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
    MescouponsPage,
    MalistedecoursePage,
    ProduitPage,
    CouponsproduitPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SupermarcheapiService,
    LoginService,
    ProduitapiService,
    mesProduitsapiService,
    mesCouponsapiService,
    couponsbyproductService,
    GoogleMaps,
    Geolocation
  ]
})
export class AppModule {}
