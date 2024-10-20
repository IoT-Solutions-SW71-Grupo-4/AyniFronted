import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class BaseService<T> {

  basePath: string = `${environment.serverBasePath}`;
  resourceEndpoint: string = '/resource';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })
  }

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred ${error.error.message}`);
    } else {
      console.log(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  private resourcePath() {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  create(item: any): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  delete(id: any) {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  update(id: any, item: any): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAll(): Observable<T> {
    return this.http.get<T>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
