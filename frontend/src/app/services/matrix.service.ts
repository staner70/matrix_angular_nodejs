import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Matrix } from '../interfaces/matrix';


@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  private _url: string = 'http://localhost:5000/api/matrix'

  constructor(private http: HttpClient) { }

  getMatrix(): Observable<Matrix[]> {
    return this.http.get<Matrix[]>(this._url).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  handleError( err: HttpErrorResponse ) {
     let errorMessage = '';
     if(err.error instanceof ErrorEvent){
       errorMessage = 'Bir hata olustu' + err.error.message
     } else {
       errorMessage = 'Sistemsel bir hata'
     }
     return throwError(errorMessage);
  }
  
  
}
