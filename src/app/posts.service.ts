import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';


@Injectable()
export class PostsService {
  private postUrl = 'https://jsonplaceholder.typicode.com/posts';


  constructor(private _http:Http) { }

  getPost():Observable<Post[]>{
    return this._http.get(this.postUrl)
                      .map((response: Response)=><Post[]>response.json())
                      .do((data) =>console.log(data))
                      .catch((error:Response)=>{console.log(error.status+"  "+error.text) ;return Observable.throw("jhdsjs")});

  }

}

export class Post{
  userId:number;
  id:number;
  title:number;
  body:number;
}
