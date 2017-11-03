import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private auth: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean> {
    console.log(this.auth.authState);
      return Observable.from(this.auth.authState)
        .take(1)
        .map(state => !!state)
        .do(authenticated => {
      if (!authenticated) this.router.navigate([ '/login' ]);
      })
    }

}
