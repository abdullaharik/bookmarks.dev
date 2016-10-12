import {Injectable} from '@angular/core';
import {Bookmark} from './bookmark';

import { BOOKMARKS } from './mock-bookmarks';
import {Headers, Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookmarkService {

  private bookmarksUrl = 'http://localhost:3000/bookmarks';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  /*
   getBookmarks(): Promise<Bookmark[]> {
   return this.http.get(this.bookmarksUrl)
   .map(response => {
   const data = response.json.
   })
   .toPromise()
   .then(response => response.json().data as Bookmark[])
   .catch(this.handleError);
   }
   */

  getBookmarks(): Promise<Bookmark[]> {
    return this.http.get(this.bookmarksUrl)
      .toPromise()
      .then(response => response.json() as Bookmark[])
      .catch(this.handleError);
  }



  /*
   getBookmarks(): Promise<Bookmark[]> {
   return Promise.resolve(BOOKMARKS);
   }
   */

  getBookmark(id: string): Promise<Bookmark> {
    return this.getBookmarks()
      .then(bookmarks => bookmarks.find(bookmark => bookmark._id === id));
  }

  update(bookmark:Bookmark): Promise<Bookmark> {
    const url = `${this.bookmarksUrl}/${bookmark._id}`;
    return this.http
    .put(url, JSON.stringify(bookmark), {headers: this.headers})
    .toPromise()
    .then(() => bookmark)
    .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
