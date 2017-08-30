// Core components
import { Injectable }   from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';



// Models
// Importez vos models ici

@Injectable()
export class LoginService {

  private baseUrl: string = 'http://localhost/listeCourse/web/app_dev.php/api/';

  constructor(private http: Http) { }


  public login(login,password): Promise<any> {
    const url = `${this.baseUrl}login`;
    let params = new URLSearchParams();
    params.set('login', login);
    params.set('password', password);
    params.set('deviceId', "xxxxxxxxxxx");
    params.set('deviceType', "ANDROID");

    return this.http.get(url,{search: params}).toPromise().then(
      reponse => reponse.json()
    ).catch(error => console.log('une erreur est survenue'+ error))

}
}
