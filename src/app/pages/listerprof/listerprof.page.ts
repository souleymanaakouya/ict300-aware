import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-listerprof',
  templateUrl: './listerprof.page.html',
  styleUrls: ['./listerprof.page.scss'],
})
export class ListerprofPage implements OnInit {
  
  hasLoadedEnseignants: any = [];
  enseignants: any = [];
  userData: any;

  constructor( private httpClient: HttpClient,private modalController: ModalController) {
        this.getData();
   }

  ngOnInit() {
  }
  async closeModal(){
    await this.modalController.dismiss();
  }

   async getData() {
    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    let token = userinfo?.access_token;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

    const requestOptions = { headers: headers };

     this.httpClient.get('https://aware-backend.herokuapp.com/api/professor', requestOptions).subscribe((e) => {
      console.log(e);
      this.enseignants = e;
      this.hasLoadedEnseignants= true;
    },
    (err) => {
      console.log(err);
      this.hasLoadedEnseignants = false;
    })
  }


}
