import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {
  
  private url:string = 'https://beer.symfonycasts.com.br/v1';

  constructor(public http: Http) {
    console.log('Hello HttpServiceProvider Provider');
  }

  getAll(endpoint){
    return this.http.get(`${this.url}/${endpoint}`)
    .map(res => {
      return res.json();
    });
  }

  get(endpoint, id) {
    return this.http.get(`${this.url}/${endpoint}/${id}`)
    .map(res => {
      return res.json();
    });
  }

  post(endpoint, resource) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(`${this.url}/${endpoint}`, resource, options)
      .map(res => { 
        return res.json();
      });
  }

}
