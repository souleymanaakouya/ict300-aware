import { PopoverComponent } from './../popover/popover.component';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'

import { ModalPage } from '../modal/modal.page';
import { IonLoaderService } from '../service/ion-loader.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {



  // ionicForm: any;
  levels: any = [];
  hasLoadedStudents: boolean = false;
  enseignants: any = [];
  hasLoadedLevels: boolean = false;
  cours: any = [];
  possiblesSemesters: any = [];
  possiblesUsers: any = [];
  possiblesStudents: any = [];
  hasLoadedCours: boolean = false;
  students: any = [];
  image!: string;
  formPresence: FormGroup;
  profiles: any;
  semesters: any = [];
  hasLoadedSemesters: boolean = false;
  hasLoadedUsers: boolean = false;
  users: any = [];

  data = {
    date: '',
    duration: '',
    course_title: '',
    signature: null,
    session: '',
    content: '',
    course_id: '',
    professor_id: '',
    delegate_id: '',
    students: '',
    level_id: '',
    semesters: '',
    hall: '',
  }


  isSubmitted = false;


  constructor(public loadingCtrl: LoadingController, public toastController: ToastController, private ionLoaderService: IonLoaderService, private popoverController: PopoverController, private formBuilder: FormBuilder, private httpClient: HttpClient, private modalCtrl: ModalController) {
    this.formPresence = this.formBuilder.group({
      course_title: ['', Validators.required],
      course_id: ['', Validators.required],
      professor_id: ['', Validators.required],
      delegate_id: ['', Validators.required],
      students: ['', Validators.required],
      duration: ['', Validators.required],
      session: ['', Validators.required],
      content: ['', Validators.required],
      date: ['', Validators.required],
      signature: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      level_id: ['', Validators.required],
      semesters: ['', Validators.required],
      hall: ['', Validators.required],
    });


    // this.formPresence.get("semesters").valueChanges.subscribe(value => {
    //   console.log(value)
    //   let teachingUnits = this.cours.filter((elt) => {
    //     return elt.semester.id === parseInt(value);
    //   });

    //   if (this.possiblesCourses.length > 0) {
    //     this.formPresence.get("course_id").setValue(teachingUnits[0].id);
    //   }
    //   else {
    //     this.formPresence.get("course_id").setValue(null);
    //   }
    // });

    this.formPresence.get("level_id").valueChanges.subscribe(value => {
      console.log(value)
      let teachingUnits = this.cours.filter((elt) => {
        return elt.level.id === parseInt(value);
      });

      if (this.possiblesCourses.length > 0) {
        this.formPresence.get("course_id").setValue(teachingUnits[0].id);
      }
      else {
        this.formPresence.get("course_id").setValue(null);
      }
    });

    this.formPresence.get("level_id").valueChanges.subscribe(value => {
      console.log(value)
      let teachingUnits = this.students.filter((elt) => {
        return elt.level.id === parseInt(value);
      });

      if (this.possiblesStudents.length > 0) {
        this.formPresence.get("students").setValue(teachingUnits[0].id);
      }
      else {
        this.formPresence.get("students").setValue(null);
      }
    });

    // this.formPresence.get("level_id").valueChanges.subscribe(value => {
    //   console.log(value)
    //   let teachingUnits = this.users.filter((elt) => {
    //     return elt.level.id === parseInt(value);
    //   });

    //   if (this.possiblesUsers.length > 0) {
    //     this.formPresence.get("delegate_id").setValue(teachingUnits[0].id);
    //   }
    //   else {
    //     this.formPresence.get("delegate_id").setValue(null);
    //   }
    // });

    this.formPresence.get("professor_id").valueChanges.subscribe(value => {
      console.log(value)
      let teachingUnits = this.cours.filter((elt) => {
        let professorsId = elt.professors.map(prof => prof.id);
        return professorsId.includes(parseInt(value));
      });

      if (this.possiblesCourses.length > 0) {
        this.formPresence.get("course_id").setValue(teachingUnits[0].id);
      }
      else {
        this.formPresence.get("course_id").setValue(null);
      }
    });

    this.formPresence.get("semesters").valueChanges.subscribe(value => {
      console.log(value)
      let teachingUnits = this.cours.filter((elt) => {
        let semesterId = elt.semester.map(semes => semes.id);
        return semesterId.includes(parseInt(value));
      });

      if (this.possiblesCourses.length > 0) {
        this.formPresence.get("course_id").setValue(teachingUnits[0].id);
      }
      else {
        this.formPresence.get("course_id").setValue(null);
      }
    });

  }



  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {
    
    this.getData();
    console.log(history);
    // this.formPresence.reset();
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
        this.hasLoadedLevels = false;
      })

    this.httpClient.get('https://aware-backend.herokuapp.com/api/professor', requestOptions).subscribe((e) => {
      console.log(e);
      this.enseignants = e;
    },
      (err) => {
        console.log(err);
      }),

      this.httpClient.get('https://aware-backend.herokuapp.com/api/course', requestOptions).subscribe((e) => {
        console.log(e);
        this.cours = e;
        this.hasLoadedCours = true;
      },
        (err) => {
          console.log(err);
          this.hasLoadedCours = false;
        });

    this.httpClient.get('https://aware-backend.herokuapp.com/api/user', requestOptions).subscribe((e) => {
      console.log(e);
      this.users = e;
      this.hasLoadedUsers = true;
    },
      (err) => {
        console.log(err);
        this.hasLoadedUsers = false;
      })

    this.httpClient.get('https://aware-backend.herokuapp.com/api/semester', requestOptions).subscribe((e) => {
      console.log(e);
      this.semesters = e;
      this.hasLoadedSemesters = true;
    },
      (err) => {
        console.log(err);
        this.hasLoadedSemesters = false;
      })
    this.httpClient.get('https://aware-backend.herokuapp.com/api/student', requestOptions).subscribe((e) => {
      console.log(e);
      this.students = e;
      // this.possiblesStudents = e;

      this.hasLoadedStudents = true;
    },
      (err) => {
        console.log(err);
        this.hasLoadedStudents = false;
      })
  }
  get possiblesStudent() {
    let temp = this.students.filter(elt => true);

    if (this.formValue.level_id && this.formValue.level_id !== '') {
      temp = temp.filter(elt => elt.level.id.toString() === this.formValue.level_id);
    }
    return temp;
  }

  // get possiblesUser() {
  //   let temp = this.users.filter(elt => true);

  //   if (this.formValue.level_id && this.formValue.level_id !== '') {
  //     temp = temp.filter(elt => elt.level.id.toString() === this.formValue.level_id);
  //   }
  //   return temp;
  // }


  get possiblesCourses() {
    let temp = this.cours.filter(elt => true);

    if (this.formValue.level_id && this.formValue.level_id !== '') {
      temp = temp.filter(elt => elt.level.id.toString() === this.formValue.level_id);
    }
    if (this.formValue.professor_id && this.formValue.professor_id !== '') {
      temp = temp.filter(elt => elt.professors.some(prof => prof.id.toString() === this.formValue.professor_id));
    }
    if (this.formValue.semesters && this.formValue.semesters !== '') {
      temp = temp.filter(elt => elt.semester.some(semes => semes.id.toString() === this.formValue.semesters));
    }
    return temp;
  }

  get formValue() {
    return this.formPresence.value;
  }

  // private submitForm(formData: any, formDirective: FormGroupDirective): void {
  //   formDirective.resetForm();
  //   this.formPresence.reset();
  // }

  enregistrer() {

    console.log(this.formPresence)
    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    let token = userinfo?.access_token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestOptions = { headers: headers, };


    const blob = this.b64toBlob(this.image);

    const signature = this.dataURLtoFile(this.image, 'signature');
    console.log(signature)

    console.log(blob);

    let formData = new FormData();
    formData.append('signature', signature);
    formData.append('date', this.formValue.date);
    formData.append('duration', this.formValue.duration);
    formData.append('professor_id', this.formValue.professor_id);
    formData.append('delegate_id', this.formValue.delegate_id);
    formData.append('course_id', this.formValue.course_id);
    formData.append('session', this.formValue.session);
    formData.append('content', this.formValue.content);
    formData.append('students', this.formValue.students);
    formData.append('semesters', this.formValue.semesters);
    formData.append('hall', this.formValue.hall);
    // const bodyData = {
    //   date: this.formValue.date,
    //   duration: this.formValue.duration,
    //   professor_id: this.formValue.professor_id,
    //   course_id: this.formValue.course_id,
    //   delegate_id: this.formValue.delegate_id,
    //   session: this.formValue.session,
    //   content: this.formValue.content,
    //   signature: signature,
    //   students: this.formValue.students
    // }

    this.httpClient.post('https://aware-backend.herokuapp.com/api/presence', formData, requestOptions).subscribe((e) => {
      console.log(e);
      this.loginSuccess();
      this.showLoading();
    },
      (err) => {
        console.log(err);
        this.loginError('verifiez votre champs');
      })

  }

  // async ouvrirModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: ContentPage,
  //     componentProps: {
  //     }
  //   });

  //   modal.onDidDismiss().then(res => {
  //     console.log(res);
  //     this.image = res.data?.image;
  //     if (this.image) {
  //       this.data.signature = this.image;
  //     }
  //   });
  //   modal.present();
  // }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
      }
    });

    modal.onDidDismiss().then(res => {
      console.log(res);
      this.image = res.data?.image;
      if (this.image) {
        this.data.signature = this.image;
      }
    });
    modal.present();
  }

  b64toBlob(dataURI) {

    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpg' });
  }

  dataURLtoFile(dataurl, filename) {

    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    let fileExt = mime.split('/')[1];

    return new File([u8arr], (filename + '.' + fileExt), { type: mime });
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
  // simpleLoader() {
  //   this.loadingCtrl.create({
  //     message: 'Loading...'
  //   }).then((response) => {
  //     response.present();
  //   });
  // }

  //chargement......................
  showLoading() {
    this.loadingCtrl.create({
      message: '...',
    }).then((loading) => {
      loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 500);
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
      message: 'Envoyer avec succés.',
      position: 'middle',
      duration: 2000,
      color: 'primary',
    });
    toast.present();
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
