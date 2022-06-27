import { NavController } from '@ionic/angular';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoadingController } from '@ionic/angular';  
import { IonLoaderService } from 'src/app/service/ion-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   user = {
    email: '',
    password:''
  };

  constructor(private ionLoaderService: IonLoaderService,public loadingCtrl: LoadingController,private navctrl: NavController, public router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    
  }
//chargement......................
  showLoading() {  
  this.loadingCtrl.create({  
    message: 'Chargement...'  
    }).then((loading) => {  
     loading.present();  
  
     setTimeout(() => {  
       loading.dismiss();  
     }, 5000 );  
    });  
  }  


  async register(){
    this.router.navigate(['/register']);
  }

  async direct(){
    this.router.navigate(['/tabs']);
  }

  async login() {
    console.log(this.user);
    this.httpClient.post("https://aware-backend.herokuapp.com/api/login", this.user).subscribe((e: any) => {
    
      console.log(e);
      localStorage.setItem('userinfo', JSON.stringify(e));
      this.direct();
    },
    (err) => {
      console.log(err);
    })
  }

  // displayAutoLoader() {
  //   this.ionLoaderService.autoLoader();
  // }
  // showLoader() {
  //   this.ionLoaderService.simpleLoader();
  // }
  // hideLoader() {
  //   this.ionLoaderService.dismissLoader();
  // }
  // customizeLoader() {
  //   this.ionLoaderService.customLoader();
  // }
}
