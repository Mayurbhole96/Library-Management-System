import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  constructor(  private http : HttpClient
    ) { }

  getBookData() {
    return this.http.get<any[]>(`${environment.apiUrl}`.concat('book/'));
  }

 saveBookData(value:any) {
  if (value.id) {
    return this.http.put<any[]>(`${environment.apiUrl}`.concat('book/' + value.id + '/'), value)
      .pipe(map(data => {
        var status=1
        data[status] = 1;
        console.log(data[status],'----------------data-------');
        
        return data;
      }),
        catchError(this.errorHandler));
  }
  else {
    return this.http.post<any[]>(`${environment.apiUrl}`.concat('book/'), value)
      .pipe(map(data => {
        var status=2
        data[status] = 2;
        return data;
      }),
        catchError(this.errorHandler)
      );
  }


  // if (value.id) {
  //   return this.http.put(`${environment.apiUrl}`.concat('/book/' + value.id + '/'), value)
  //     .pipe(map(data => {
  //       var status=1;
  //       data[status] = 1;

  //       return data;
  //     }),
  //       catchError(this.errorHandler));
  // }
  // else {
  //   return this.http.post(`${environment.apiUrl}`.concat('/book/'), value)
  //     .pipe(map(data => {
  //       var status=2;
  //       data[status] = 2;
  //       return data;
  //     }),
  //       catchError(this.errorHandler)
  //     );
  // }
  }

  deleteBookData(id:any) {
    return this.http.delete<any[]>(`${environment.apiUrl}`.concat(`book/${id}/`));
  }

  
  gotoLogin(value:any):Observable<any[]>{
    return this.http.post<any[]>(`${environment.apiUrl}`.concat('login/'), value)
      .pipe(map(data => {
        return data;
      }),
        catchError(this.errorHandler)
      );
  }

  gotoSignup(value:any):Observable<any[]>{
    return this.http.post<any[]>(`${environment.apiUrl}`.concat('signup/'), value)
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
