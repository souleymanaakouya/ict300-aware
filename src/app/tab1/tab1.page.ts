import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  hasLoadedStudents: boolean = false;
  students: any = [];
  userData: any;  

constructor(public router: Router, public modalController: ModalController, private httpClient: HttpClient) 
{
    this.getData();
}

  async direct(){
  this.router.navigate(['/etudiant']);
  }
 async getData() {
    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    let token = userinfo?.access_token;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

    const requestOptions = { headers: headers };

   this.httpClient.get('https://aware-backend.herokuapp.com/api/student', requestOptions).subscribe((e) => {
      console.log(e);
      this.students = e;
      this.hasLoadedStudents= true;
    },
    (err) => {
      console.log(err);
      this.hasLoadedStudents = false;
    })
  }

  drop(i : number){
    console.log('test');
    if(confirm('vous etes sur de vouloir supprimer')){
      this.userData.splice(i, 1);
      localStorage.setItem('id', JSON.stringify(this.userData));
    }
  }

  async closeModal(){
    await this.modalController.dismiss();
  }
  // filterArray(ev:any)
  // {
  //     this.arr=this.arr1;
  //     const val = ev.target.value;
  //     if(val && val.trim() != ""){
  //       this.arr = this.arr1.filter((item)=>{
  //         return (item.id.toLowerCase().indexOf(val.toLowerCase()) > -1  || item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.matricule.toLowerCase().indexOf(val.toLowerCase())> -1 || item.contact.toLowerCase().indexOf(val.toLowerCase())>-1)
  //       })
  //     } 
  // }
}