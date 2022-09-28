import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  [x: string]: any;
  
readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http:HttpClient) { }

  getBookData():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/book/');
  }

  // getBookData() {
  //   return this.http.get<any[]>(this.APIUrl + 'book/');
  //   // return this.http.get(`${environment.apiUrl}`.concat('/book/'));
  // }

 saveBookData(value:any) {
  if (value.id) {
    return this.http.put<any[]>(this.APIUrl.concat('/book/' + value.id + '/'), value)
      .pipe(map(data => {
        var status=1
        data[status] = 1;
        return data;
      }),
        catchError(this.errorHandler));
  }
  else {
    return this.http.post<any[]>(this.APIUrl.concat('/book/'), value)
      .pipe(map(data => {
        var status=2
        data[status] = 2;
        return data;
      }),
        catchError(this.errorHandler)
      );
  }
  }

  deleteBookData(id:any) {
    return this.http.delete<any[]>(this.APIUrl.concat(`/book/${id}/`));
  }

  
  gotoLogin(value:any):Observable<any[]>{
    return this.http.post<any[]>(this.APIUrl.concat('/login/'), value)
      .pipe(map(data => {
        return data;
      }),
        catchError(this.errorHandler)
      );
  }

  gotoSignup(value:any):Observable<any[]>{
    return this.http.post<any[]>(this.APIUrl.concat('/signup/'), value)
      .pipe(map(data => {
        return data;
      }),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error || "Server Error");
    // return throwError(error.message || "server error.");
  }

}
