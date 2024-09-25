import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  basePath: string = 'http://api.weatherunlocked.com/api';
  app_key: string = '3c27f99a19ae6354f4242735dc05c0a9';
  app_id: string = '7afc3ba7';

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json'
    })
  }

  constructor(protected http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    // Default error handling
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(`Backend returned core ${error.status}, body was ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }
  getWeather(code: string, type:string){
    return this.http.get(`${this.basePath}/${type}/${code}?app_id=7afc3ba7&app_key=3c27f99a19ae6354f4242735dc05c0a9`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
