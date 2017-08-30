import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';
import {SupermarcheapiService} from "../../services/supermarcheapi.service";
import {SupermarchesModel} from "../../models/supermarches.model";
import {toArray} from "rxjs/operator/toArray";

const MARKER_SIZE = 30;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  supermarche: SupermarchesModel = new SupermarchesModel();
  token: string;
  listSupermarche: Array<any>;
  public map: GoogleMap;
  constructor(public navCtrl: NavController, public platform: Platform, private geoLocation: Geolocation , private googleMaps: GoogleMaps, private supermarcheApiService: SupermarcheapiService) {
    this.token = localStorage.getItem("token");
    this.getSupermarches(null);
    platform.ready().then(() =>
    {
      this.loadMap();
    });
  }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // Geolocation
    this.geoLocation.getCurrentPosition().then((resp) => {

      let userPosition: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);

      let position: CameraPosition<any> = {
        target: userPosition,
        zoom: 15,
        tilt: 0
      };

      this.map.moveCamera(position);

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker

      }
    );


  }
  public getSupermarches(refresher){
    this.supermarcheApiService.getSupermarches(this.token)
      .then(newsFetched => {
        this.supermarche = newsFetched;

        (refresher) ? refresher.complete() : null;
        console.log(this.supermarche);

      });

  }
  private addMarkerOnMap(supermarche: SupermarchesModel) {
    // create LatLng object
    let markerposition: LatLng = new LatLng(supermarche.latitude ,supermarche.longitude);
    let markerIcon = {
      'url': supermarche.photo,
      'size': {
        width: Math.round(MARKER_SIZE),
        height: Math.round(MARKER_SIZE)
      }
    }
    let markerOptions: MarkerOptions = {
      position: markerposition,
      title: supermarche.libelle,
      snippet: 'Touch for more infos',
      animation: GoogleMapsAnimation.DROP,
      icon: markerIcon
    };
    this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
      });

  }
}
