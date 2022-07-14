import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  users = {
    name: '',
    email: '',
    role:'',
    level:'',
    matricule: '',
  };

  constructor(public httpClient: HttpClient, private modalController: ModalController) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    let token = userinfo?.access_token;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      // console.log()

    const requestOptions = { headers: headers };
    this.httpClient.get('https://aware-backend.herokuapp.com/api/profile', requestOptions).subscribe((response: any)=>{
      console.log(response);
      this.users = response;
    }, (error)=>{
        console.error(error);
    });
  }
  async closeModal(){
    await this.modalController.dismiss();
  }
}
