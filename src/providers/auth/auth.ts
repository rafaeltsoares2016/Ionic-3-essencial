import { HttpServiceProvider } from './../http-service/http-service';
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
    public http: HttpServiceProvider,
    public storage: Storage,
    public toastCtrl: ToastController
  ) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials) {
    this.http.post('auth/login', credentials)
      .subscribe(data => {
        this.storage.set('token', data.token);
      },
    error => {
      let msg = error.json();
      let toast = this.toastCtrl.create({
        message: 'Usuário ou senha incorretos!',
        duration: 3000
      });
      toast.present();
    }
    );
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
