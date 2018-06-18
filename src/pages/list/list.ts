import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthProvider } from './../../providers/auth/auth';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  public beer = {
    name: "", 
    price: "", 
    type: "", 
    mark: "",
    img: ""
  };

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public camera: Camera,
    public AuthService: AuthProvider
  ) {
    // If we navigated to this page, we will have an item available as a nav param

  }

  // ionViewCanEnter(){
  //  return this.authService.userIsLogged();
  // }

  saveBeer(beer) {
    this.http.post('beers', beer)
      .subscribe(data => {
        let toast = this.toastCtrl.create({
          message: 'Cerveja cadastrada com sucesso!',
          duration: 3000
        });
        toast.present();
      });
  }

  getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((ImageData) => {
      let base64Image = 'data:image/jpeg;base64,' + ImageData;
      this.beer.img = base64Image;
    }, (err) => {
      console.log(err);
    });
  }
}
