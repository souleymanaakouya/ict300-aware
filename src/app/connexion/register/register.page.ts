import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  levels: any = [];
  hasLoadedLevels: boolean = false;
  data = {
    name: '',
    email: '',
    password: '',
    role: '',
    level_id: 1,
  }
  constructor( public router: Router, private httpClient: HttpClient) {
    this.getData();
  }
  
  ngOnInit() {
  }

   async direct(){
    this.router.navigate(['/login']);
  }

  async register(){
    
    this.httpClient.post('https://warm-depths-77252.herokuapp.com/api/register', this.data).subscribe((e) => {
       console.log(e);
      //  this.direct();
      localStorage.setItem('userinfo', JSON.stringify(e));
     },
     (err) => {
       console.log(err);
     })
  }
  async getData() {
    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    let token = userinfo?.access_token;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
 
    const requestOptions = { headers: headers };

    this.httpClient.get('https://warm-depths-77252.herokuapp.com/api/level').subscribe((e) => {
      this.levels = e;
      this.hasLoadedLevels = true;
    },
    (err) => {
      console.log(err);
      this.hasLoadedLevels = false;
    })
  }

}
