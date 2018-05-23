import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TestPage } from '../test/test';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public http: Http) {
      this.http.get(this.url + '/beers')
        .map(res => res.json()
      )
        .subscribe(data => {
          this.beers = data;
        });

  }

  getBeerInfo(id) {
    this.navCtrl.push(TestPage,
    {
      'beer_id': id,
      'api_url': this.url
    });
  }

  private url:string = 'https://beer.symfonycasts.com.br/v1';
  private beers: Array<{}>;

}

//https://bitly.com/ce-learn/v1