import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

// Native components
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, GoogleMapsAnimation, MarkerOptions, Marker } from '@ionic-native/google-maps';

// Mocks
import * as TreeMapping from '../../models/tree.mapping';
import {SupermarcheapiService} from "../../services/supermarcheapi.service";
import {SupermarchesModel} from "../../models/supermarches.model";
import {ProduitPage} from "../produit/produit";

const MARKER_SIZE = 30;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  public map: GoogleMap;
  token: string;
  supermarche:any;
  constructor(public navCtrl: NavController, private geoLocation: Geolocation ,private googleMaps: GoogleMaps, public platform: Platform, private supermarcheApiService: SupermarcheapiService) {
    this.token = localStorage.getItem("token");

    platform.ready().then(() => {
      this.supermarcheApiService.getSupermarches(this.token).then(
        response => {
          this.supermarche = response.data;
          console.log(this.supermarche);
          this.loadMap(this.supermarche);
        }
      );
    });
  }

  loadMap( sup: SupermarchesModel[]) {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // Geolocation
    this.geoLocation.getCurrentPosition().then((resp) => {

      let userPosition: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
        console.log(userPosition);
      let position: CameraPosition<any> = {
        target: userPosition,
        zoom: 15,
        tilt: 0
      };

      this.map.moveCamera(position);

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
        for(var tree of sup) {
          this.addMarkerOnMap(tree);
        }
      }
    );
  }

  private addMarkerOnMap(tree: SupermarchesModel) {
    // create LatLng object
    let markerPosition: LatLng = new LatLng(tree.latitude,tree.longitude);

    let markerIcon = {
      'url': 'http://amhsoft.net/htitey/ListeCourse/web/'+tree.photo,
      'size': {
        width: Math.round(MARKER_SIZE),
        height: Math.round(MARKER_SIZE)
      }
    }

    let markerOptions: MarkerOptions = {
      position: markerPosition,
      title: tree.libelle,
      snippet: 'Touch for more infos latitude:'+tree.latitude+' longitude: '+tree.longitude,
      animation: GoogleMapsAnimation.DROP,
      icon: markerIcon
    };

    this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
        marker.addEventListener(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(e => {
            console.log('you hit a pit marker');
            this.navCtrl.push(ProduitPage);
            localStorage.setItem('idSupermarche', tree.id);
          });

      });

  }
}
