import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../Common/global.constants';
import { from, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageStickNotesService {
  public options;
  Url: string;
  token: string;
  header: any;
  constructor(private http: HttpClient,) {
    this.Url =  GlobalConstants.apiURL + "api/ManageStickyNotes";
    this.setHeaders();
   }
   setHeaders() {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
      }),
      withCredentials: false
    };
  }

  SaveStickyNotes(note): Observable<any> {
    console.log(note);
    var formData = new FormData();
    formData.append('Id',note.id);
    formData.append('Title',note.title);
    formData.append('Description',note.content);
    formData.append('ColorName',note.colorname);
    var ManageStickNotesDTO = {Id:note.id,Title:note.title,Description:note.content,ColorName:note.colorname};
     return from(new Promise((resolve, reject) => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
          if (xhr != undefined && xhr.readyState === 4) {

              if (xhr != undefined && xhr.status === 200) {
                  debugger;
                  resolve(JSON.parse(xhr.response));
              } else {
                  reject();
              }
          }
      };
      xhr.open('post', this.Url +"/SaveStickyNotes", true);
      xhr.setRequestHeader('processData', "false");
      xhr.setRequestHeader('contentType', "application/json; charset=utf-8");
      xhr.send(formData);
  }));
  }
   GetStickyNotes(): Observable<any>{
      return this.http.post<any>(this.Url + "/GetStickyNotes", this.options);

  }

}
