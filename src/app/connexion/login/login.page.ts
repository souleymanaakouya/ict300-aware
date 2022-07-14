import { NavController, ToastController } from '@ionic/angular';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { IonLoaderService } from 'src/app/service/ion-loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    password: ''
  };
  isSubmitted = false;
  formPresence: FormGroup;

  constructor(
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private ionLoaderService: IonLoaderService,
    public loadingCtrl: LoadingController,
    private navctrl: NavController,
    public router: Router,
    private httpClient: HttpClient) {
    this.formPresence = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  ngOnInit() {

  }



  async register() {
    this.router.navigate(['/register']);
  }

  async direct() {
    this.router.navigate(['/tabs']);
  }
  get formValue() {
    return this.formPresence.value;
  }

  async login() {
    console.log(this.formPresence);

    let formData = new FormData();
    formData.append('email', this.formValue.email);
    formData.append('password', this.formValue.password);


    this.httpClient.post("https://aware-backend.herokuapp.com/api/login", formData).subscribe((e: any) => {

      console.log(e);
      localStorage.setItem('userinfo', JSON.stringify(e));
      this.direct();
      this.loginSuccess();
      this.showLoading();
    },
      (err) => {
        console.log(err);
        this.loginError('verifiez votre champs');
      })
  }

  //chargement......................
  showLoading() {
    this.loadingCtrl.create({
      message: 'Chargement...'
    }).then((loading) => {
      loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 200);
    });
  }

  async loginError(err: string) {
    const toast = await this.toastController.create({
      message: err,
      position: 'middle',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  async loginSuccess() {
    const toast = await this.toastController.create({
      message: 'Vous êtes maintenant connecté.',
      position: 'middle',
      duration: 2000,
      color: 'primary',
    });
    toast.present();
  }

  get errorControl() {
    return this.formPresence.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.formPresence.valid) {
      console.log('Encours!')
      return false;
    } else {
      console.log(this.formPresence.value)
    }
  }
}
