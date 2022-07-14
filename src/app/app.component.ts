import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent {
  public pages: any[] = [
    {title: 'Acceil', url: '/tabs/tab2', icon: 'home' },
    {title: 'Emargement', url: '/tabs/tab3', icon: 'list' },
    {title: 'Syllabus', url: '/syllabus', icon: 'book'},
    {title: 'Etudiant', url: '/tabs/tab1', icon: 'people'},
    {title: 'Professeur', url: '/listerprof', icon: 'people'},
  ];
  users = {
    name: '',
    email: '',
    role:''
  };
 constructor(public httpClient: HttpClient, private modalController: ModalController) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
     let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    let token = userinfo?.access_token;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

    const requestOptions = { headers: headers };
    this.httpClient.get("https://aware-backend.herokuapp.com/api/profile", requestOptions).subscribe((response: any)=>{
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
