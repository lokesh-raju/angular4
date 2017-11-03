import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';

@Injectable()
export class VotingdoneService implements CanActivate{

constructor(public afAuth: AngularFireAuth, private router: Router,public afDb: AngularFireDatabase) { }
items: Observable<any[]>;
observable:Observable<boolean>;
uid:any;
access:boolean=true;
   canActivate(): boolean {
    this.afAuth.authState.subscribe(
         (auth) => {
           if(auth && auth.uid!=null){
             //return true;
             this.uid=auth.uid;
             /*this.access=*/this.afDb.object('users/'+auth.uid).valueChanges().subscribe(
               resp=>{
                 if(resp!=null){
                   console.log(resp);
                   this.access=false;
                   this.router.navigateByUrl('/login');
                 }
                 else{
                   console.log(resp);
                     this.access=true;
                 }
               }
               );
           }
         }
    ); 
    return this.access;
   }

}
