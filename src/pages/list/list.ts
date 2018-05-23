import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  private url:string = 'https://beer.symfonycasts.com.br/v1';
  public beer = {
    name: "", 
    price: "", 
    type: "", 
    mark: ""
  };

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public http: Http
  ) {
    // If we navigated to this page, we will have an item available as a nav param

  }
  saveBeer(beer) {
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
}
