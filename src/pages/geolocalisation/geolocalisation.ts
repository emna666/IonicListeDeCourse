import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {Geolocation, GeolocationOptions, Geoposition,PositionError} from '@ionic-native/geolocation';
import {GoogleMaps} from "@ionic-native/google-maps";

/**
 * Generated class for the GeolocalisationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-geolocalisation',
  templateUrl: 'geolocalisation.html',
})
export class GeolocalisationPage {

  options: GeolocationOptions;
  currentPos: Geoposition;
  @ViewChild('map') mapElement : ElementRef;
  map: any;
  constructor(public navCtrl: NavController,private geolocation: Geolocation, private googleMaps: GoogleMaps)
  {

  }

}
