import { ApiError } from './../models/api-error';
import { environment } from './../../../environments/environment';
import { User } from './../models/user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private static readonly SESSIONS_API = `${environment.baseApi}/sessions`;
  private static defaultHeaders: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  private static defaultOptions = {
    headers: SessionService.defaultHeaders,
    withCredentials: true
  };
  private static readonly CURRENT_USER_KEY = 'current-user';

  public user: User;
  private userSubject: Subject<User> = new Subject();

  constructor(private http: HttpClient) {
    const userData = localStorage.getItem(SessionService.CURRENT_USER_KEY);
    if (userData) {
      this.user = Object.assign(new User(), JSON.parse(userData));
    }
    this.notifyUserChanges();
  }

  authenticate(user: User): Observable<User | ApiError> {
    return this.http.post<User>(SessionService.SESSIONS_API, user, SessionService.defaultOptions)
      .pipe(
        map((user: User) => {
          this.doAuthentication(user);
          return user;
        }),
        catchError(this.handleError)
      );
  }

  onUserChanges(): Observable<User> {
    return this.userSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return this.user ? true : false;
  }

  logout(): Observable<void | ApiError> {
    return this.http.delete<void>(SessionService.SESSIONS_API, SessionService.defaultOptions)
      .pipe(
        map(() => this.doLogout()),
        catchError(this.handleError)
      );
  }

  private doAuthentication(user: User): void {
    this.user = user;
    localStorage.setItem(SessionService.CURRENT_USER_KEY, JSON.stringify(user));
    this.notifyUserChanges();
  }

  private doLogout(): void {
    this.user = null;
    localStorage.removeItem(SessionService.CURRENT_USER_KEY);
    this.notifyUserChanges();
  }

  private notifyUserChanges(): void {
    this.userSubject.next(this.user);
  }

  private handleError(error: HttpErrorResponse): Observable<ApiError> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError(Object.assign(new ApiError(), { message: 'Something bad happened; please try again later.'}));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      return throwError(Object.assign(new ApiError(), error.error));
    }
  }

}
