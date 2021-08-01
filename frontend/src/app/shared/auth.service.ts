import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:5000/api/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        console.log(res);
        
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res.data._id).subscribe((res) => {
          
          
          this.currentUser = res;
          this.router.navigate(['profile/' + res.data._id]);
        })
      })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  //User profile
  getUserProfile(id: any): Observable<any> {
    console.log(id);
    
    let api = `${this.endpoint}/profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((Response) => {
        return Response || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}