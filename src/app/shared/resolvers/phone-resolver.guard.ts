import { ApiError } from './../models/api-error.model';
import { catchError } from 'rxjs/operators';
import { PhoneService } from './../services/phone.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { Phone } from '../models/phone.model';

@Injectable({
  providedIn: 'root'
})
export class PhoneResolverGuard implements Resolve<Phone | ApiError> {

  constructor(private phoneService: PhoneService, private router: Router) {}

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Phone | ApiError> {
      return this.phoneService.get(next.params.id).pipe(
        catchError((error: ApiError) => {
          this.router.navigate(['/phones']);
          return throwError(error);
        })
      );
  }
}
