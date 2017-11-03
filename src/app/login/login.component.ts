import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {
  error: any;
  constructor(public afAuth: AngularFireAuth,private router: Router) { 
  afAuth.authState.subscribe(
         (auth) => {
           if(auth && auth.uid!=null){
             this.router.navigateByUrl("/members");
           }
         }
    );
  }

  loginFb() {
    var provider = new firebase.auth.FacebookAuthProvider();
    //provider.addScope('email');
    //provider.addScope('user_friends');
    this.afAuth.auth.signInWithPopup(provider).then(function(result){
      this.router.navigate(['/members']);
       var user = result.user;
       // The Facebook firebase.auth.AuthCredential containing the Facebook
      // access token:
      var credential = result.credential;
    },
    function (error) {
      // The provider's account email, can be used in case of
      // auth/account-exists-with-different-credential to fetch the providers
      // linked to the email:
      var email = error.email;
      // The provider's credential:
      var credential = error.credential;
      // In case of auth/account-exists-with-different-credential error,
      // you can fetch the providers using this:
      if (error.code === 'auth/account-exists-with-different-credential') {
        this.afAuth.auth.fetchProvidersForEmail(email).then(function(providers) {
      // The returned 'providers' is a list of the available providers
      // linked to the email address. Please refer to the guide for a more
      // complete explanation on how to recover from this error.
      });
    // body...
    }  
  });
}

  loginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }
  ngOnInit() {
  }

}
