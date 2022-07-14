import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.page.html',
  styleUrls: ['./mymodal.page.scss'],
})
export class MymodalPage implements OnInit {
  hasLoadedCours: boolean = false;
  cours: any = [];
  levels: any = [];
  hasLoadedLevels: boolean = false;
  hasLoadedStudents: boolean = false;
  userData: any;
  formPresence: FormGroup;
  possiblesStudents: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
     public router: Router,
     public httpClient: HttpClient
     ) { 
    this.formPresence = this.formBuilder.group({
      students: ['', Validators.required],
      name: ['', Validators.required],
      level_id: ['', Validators.required],
    });
     }

  ngOnInit() {
    this.getUsers();
  }
  async getUsers() {
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    let token = userinfo?.access_token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // console.log()
    const requestOptions = { headers: headers };

    this.httpClient.get('https://aware-backend.herokuapp.com/api/course', requestOptions).subscribe((e) => {
      console.log(e);
      this.cours = e;
      this.hasLoadedCours = true;
    },
      (err) => {
        console.log(err);
        this.hasLoadedCours = false;
      });
    }
  closeModal() {
    this.modalCtrl.dismiss();
  }

  async fermer(){
    this.router.navigate(['/syllabus']);
  }
}
