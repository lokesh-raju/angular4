import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { fallIn, moveInLeft } from '../router.animations';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {PostsService,Post} from '../posts.service';
import {AnonymousSubscription} from "rxjs/Subscription";




@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [fallIn(),moveInLeft()]
})
export class MembersComponent implements OnInit , OnDestroy{
 name: String;
 imageUrl: String;
 posts:Post[];
 postSubscription: AnonymousSubscription;
 timerSubscription: AnonymousSubscription;
 //items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  itemsRef2: AngularFireList<any>;
  itemsRef3: AngularFireList<any>;
  itemsRef4: AngularFireList<any>;
  item2: Observable<any>;
  items: Observable<any[]>;
  preparedSpeech: Observable<any[]>;
  tabletopic: Observable<any[]>;
  bestevaluator: Observable<any[]>;
  bestPreparedSpeaker :String;
  uiId:string;
  //voteforpreparedspeech =null;
  constructor(public afAuth: AngularFireAuth,private router: Router,public afDb: AngularFireDatabase,public postsService:PostsService) { 
          afAuth.authState.subscribe(
         (auth) => {
           if(auth && auth.uid!=null){
             this.name=auth.displayName;
             this.imageUrl=auth.photoURL;
             this.uiId=auth.uid;
             //this.items = this.afDb.list('Votes-PreparedSpeech').valueChanges();
                          //console.log(this.items);
           }
         }
    );  
    this.itemsRef4 = afDb.list('users'); 
    this.itemsRef = afDb.list('Votes-PreparedSpeech');  
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => (
        { key: c.payload.key, value:c.payload.val() }
         
        ));
    });

    this.itemsRef2 = afDb.list('Votes-tabletopic');  
    this.tabletopic = this.itemsRef2.snapshotChanges().map(changes => {
      return changes.map(c => (
        { key: c.payload.key, value:c.payload.val() }
        ));
    });

    this.itemsRef3 = afDb.list('Votes-bestevaluator');  
    this.bestevaluator = this.itemsRef3.snapshotChanges().map(changes => {
      return changes.map(c => (
        { key: c.payload.key, value:c.payload.val()}  
        ));
    });
    //this.items=afDb.list('Votes-PreparedSpeech').valueChanges();
    console.log(this.items);
  }

  logForm(value: NgForm) {
    console.log(value.controls['voteforpreparedspeech'].value.key +"  "+value.controls['voteforpreparedspeech'].value.value.text);
    
    //console.log(this.items.find(value.controls['voteforpreparedspeech'].value));
    this.updateItem2(value.controls['voteforpreparedspeech'].value.key,Number(value.controls['voteforpreparedspeech'].value.value.text)+1);
    this.updateItem3(value.controls['voteforbestevaluator'].value.key,Number(value.controls['voteforpreparedspeech'].value.value.text)+1);
    this.updateItem4(this.uiId,this.name);
    //this.addItem(value.controls['voteforpreparedspeech'].value.key+1,Number(value.controls['voteforpreparedspeech'].value.value.text)+1);
    console.log(value.controls['votefortabletopic'].value);
    console.log(value.controls['voteforbestevaluator'].value);
  }

  addItem(key: string,newName: number) {

    this.itemsRef.update(key,{ text: newName });
  }
  updateItem(key: string, newText: number) {
    console.log(key);
    console.log(newText);
    this.itemsRef.update(key, { text: String(newText) });
  }

  updateItem2(key: string, newText: number) {
    console.log(key);
    console.log(newText);
    this.itemsRef2.update(key, { text: String(newText) });
  }
  updateItem3(key: string, newText: number) {
    console.log(key);
    console.log(newText);
    this.itemsRef3.update(key, { text: String(newText) });
  }
  updateItem4(key: string, newText: String) {
    console.log(key);
    console.log(newText);
    this.itemsRef4.update(key, { text: String(newText) });
  }
  deleteItem(key: string) {    
    this.itemsRef.remove(key); 
  }
  deleteEverything() {
    this.itemsRef.remove();
  }

  toggle(){
    console.log("Heelo");
  }

  logout() {
     this.afAuth.auth.signOut();
     console.log('logged out');
     this.router.navigateByUrl('/login');
  }

  ngOnInit() {
   //this.pullData();
  }

  pullData(){
    this.postSubscription=this.postsService.getPost().subscribe(posts=>{console.log(posts);this.posts=posts;this.scheduler()});
  }

  public ngOnDestroy(): void {
    if (this.postSubscription) {
        this.postSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
    }
}

  scheduler(){
   this.timerSubscription=Observable.timer(5000).first().subscribe(()=>this.pullData());
  }
  onFormSubmit(form: NgForm){
  this.bestPreparedSpeaker=form['bestPreparedSpeaker'].value;
  }

}
