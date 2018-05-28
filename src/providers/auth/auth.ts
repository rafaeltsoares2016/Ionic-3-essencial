import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage} from '@ionic/storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  login() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });
    this.http.post(this.url + '/beers', beer, options)
      .map(res => { res.json() })
      .subscribe(data => {
        let toast = this.toastCtrl.create({
          message: 'Cerveja cadastrada com sucesso!',
          duration: 3000
        });
        toast.present();
      });
  }

  userIsLogged() {
    return this.storage.get('token').then(val => {
      if(val !== undefined) {
        return val;
      } else {
        return false;
      }
    });
  }

  logout() {
    this.storage.remove('token');
  }
}
