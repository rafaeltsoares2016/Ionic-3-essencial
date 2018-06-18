import { HttpServiceProvider } from './../../providers/http-service/http-service';
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
    public http: HttpServiceProvider
  ) {
      this.http.getAll('beers')
                .subscribe(data => {
                  this.beers = data;
                });
  }

  getBeerInfo(id) {
    this.navCtrl.push(TestPage,
    {
      'beer_id': id,
    });
  }

  private beers: Array<{}>;

}

//https://bitly.com/ce-learn/v1