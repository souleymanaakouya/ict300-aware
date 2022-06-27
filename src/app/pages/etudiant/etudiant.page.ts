import { Component, OnInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.page.html',
  styleUrls: ['./etudiant.page.scss'],
})
export class EtudiantPage implements OnInit {
// data = {
  //   name: '',
  //   matricule: '',
  //   level_id: 1,
  // }
    hasLoadedLevels: boolean = false;
    levels: any = []; 
    formPresence:FormGroup;

constructor(
  public modalController: ModalController, 
  private httpClient: HttpClient,
  private popoverController: PopoverController,
  private formBuilder: FormBuilder) 
{
this.formPresence = this.formBuilder.group({
      name: ['',Validators.required],
      matricule: ['',Validators.required],
      level_id: ['',Validators.required],
      
    })
}


  ngOnInit() {
        this.getData();
  }

  async getData() {
    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    let token = userinfo?.access_token;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

    const requestOptions = { headers: headers };

    this.httpClient.get('https://aware-backend.herokuapp.com/api/level', requestOptions).subscribe((e) => {
      console.log(e);
      this.levels = e;
      this.hasLoadedLevels = true;
    },
    (err) => {
      console.log(err);
      this.hasLoadedLevels = false
    })
  }

 get formValue(){
  return this.formPresence.value;
}

enregistrer() {
    
    console.log(this.formPresence)
    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    let token = userinfo?.access_token;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      const requestOptions = { headers: headers };


      let formData = new FormData();
      formData.append('name', this.formValue.name);
      formData.append('matricule', this.formValue.matricule);
      formData.append('level_id', this.formValue.level_id);


      const bodyData = {
        name: this.formValue.name,
        matricule: this.formValue.matricule,
        level_id: this.formValue.level_id,

      }

  this.httpClient.post('https://aware-backend.herokuapp.com/api/student', bodyData, requestOptions ).subscribe((e) => {
      console.log(e);
    },
    (err) => {
      console.log(err);
    })
    
  } 
  async closeModal(){
    await this.modalController.dismiss();
  }
}