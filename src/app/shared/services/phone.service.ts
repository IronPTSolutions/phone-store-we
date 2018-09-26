import { ApiError } from '../models/api-error.model';
import { BaseApiService } from './base-api.service';
import { Phone } from './../models/phone.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhoneService extends BaseApiService {
  private static readonly PHONE_API = `${BaseApiService.BASE_API}/phones`;

  private phones: Array<Phone> = [];
  private phonesSubject: Subject<Array<Phone>> = new Subject();

  constructor(private http: HttpClient) {
    super();
  }

  list(): Observable<Array<Phone> | ApiError> {
    return this.http.get<Array<Phone>>(PhoneService.PHONE_API, BaseApiService.defaultOptions)
      .pipe(
        map((phones: Array<Phone>) => {
          this.phones = phones;
          this.notifyPhonesChanges();
          return phones;
        }),
        catchError(this.handleError)
      );
  }

  get(id: string): Observable<Phone | ApiError> {
    return this.http.get<Phone>(`${PhoneService.PHONE_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<void | ApiError> {
    return this.http.delete<void>(`${PhoneService.PHONE_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        map(() => {
          this.phones =  this.phones.filter(p => p.id !== id);
          this.notifyPhonesChanges();
          return;
        }),
        catchError(this.handleError)
      );
  }

  create(phone: Phone): Observable<Phone | ApiError> {
    return this.http.post<Phone>(PhoneService.PHONE_API, JSON.stringify(phone), BaseApiService.defaultOptions)
      .pipe(
        map((phone: Phone) => {
          this.phones.push(phone);
          this.notifyPhonesChanges();
          return phone;
        }),
        catchError(this.handleError)
      );
  }

  onPhonesChanges(): Observable<Array<Phone>> {
    return this.phonesSubject.asObservable();
  }

  private notifyPhonesChanges(): void {
    this.phonesSubject.next(this.phones);
  }
}
