/* eslint-disable quote-props */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, NavController, NavParams } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/domain/storage.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;

  picture: string;
  cameraOn: boolean = false;

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<any>;
  public isOpen: boolean = false;


  constructor(
    public navCtrl: NavController,
    public storage: StorageService,
    public menuCtrl: MenuController,
    public clienteService: ClienteService,
    private route: Router,
    public loandingCtrl: LoadingController) {
    this.captures = [];
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.close();

    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      //console.log('mostrando email em profile:-> ', localUser.email);
      //this.email = JSON.stringify(localUser.email);
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();

          console.log('response todo: ', response, 'cadê email em localUser: ' + localUser.email);

          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log('(navigator.mediaDevices && navigator.mediaDevices.getUserMedia): ', navigator.mediaDevices.getUserMedia);
            this.isOpen = true;
            console.log('this.isOpen: ', this.isOpen);
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
              console.log('stream: ', stream);
              this.video.nativeElement.srcObject = stream;
              console.log('stream: ', stream);
              this.video.nativeElement.play();
            });
          } else {
            console.log("Camera not supported!")
          }
        },
          error => {
            console.log('erro ao entrar em profile status', error.status);
            this.route.navigateByUrl('folder/Inbox');
          });
    }
    else {
      console.log('erro ao entrar em profile localUser', localUser);
      this.route.navigateByUrl('homePage');
    }
  }

  public capture(): void {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
        error => { });
  }

  /*getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      // Handle error
    });
  }*/

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    //var imageElement.src = imageUrl;
  };
}
