// Core components
import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {SupermarchesModel} from "../models/supermarches.model";
import {tokenKey} from "@angular/core/src/view/util";


// Models
// Importez vos models ici

@Injectable()
export class SupermarcheapiService {

  private baseUrl: string = 'http://localhost/listeCourse/web/app_dev.php/api/';

  constructor(private http: Http) { }

  public getSupermarches( token:string): Promise<SupermarchesModel> {
    const url = `${this.baseUrl}supermarches?_format=json&token=${token}`;
    console.log(url);
    return this.http.get(url).toPromise().then(
      reponse => reponse.json() as SupermarchesModel

    ).catch(error => console.log('une erreur est survenue'+ error))
  }

}
