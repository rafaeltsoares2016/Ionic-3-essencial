import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage} from '@ionic/storage';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private msg: string = 'É preciso logar para acessar!';
  
  constructor(
    public http: Http,
    public storage: Storage,
    public toastCtrl: ToastController
  ) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.post('https://beer.symfonycasts.com.br/v1/auth/login', credentials, options)
      .map(res => res.json())
      .subscribe(data => {
        this.storage.set('token', data.token);
      });
  }

  userIsLogged() {
    return this.storage.get('token').then(val => {
      if(val !== undefined) {
        return val;
      } else {
        let toast = this.toastCtrl.create({
          message: 'É preciso logar para acessar!',
          duration: 3000
        });
        toast.present();
        return false;
      }
    });
  }

  logout() {
    this.storage.remove('token');
  }
}
