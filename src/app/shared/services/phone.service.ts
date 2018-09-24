import { ApiError } from '../models/api-error.model';
import { BaseApiService } from './base-api.service';
import { Phone } from './../models/phone.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhoneService extends BaseApiService {
  private static readonly PHONE_API = `${BaseApiService.BASE_API}/phones`;

  constructor(private http: HttpClient) {
    super();
  }

  list(): Observable<Array<Phone> | ApiError> {
    return this.http.get<Array<Phone>>(PhoneService.PHONE_API, BaseApiService.defaultOptions)
      .pipe(catchError(this.handleError));
  }

}
