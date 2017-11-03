import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;


  constructor(public afAuth: AngularFireAuth,private router: Router) { }

  onSubmit(formData){
    if(formData.valid){
      console.log(formData.value);
     this.afAuth.auth.createUserWithEmailAndPassword(formData.value.email,formData.value.password).then((success)=>{
       this.router.navigate(['/login'])
    }).catch((error) =>{
      console.log(error);
      this.error=error;
    });

  } 
  } 
  ngOnInit() {
  }

}
