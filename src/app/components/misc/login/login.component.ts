import { ApiError } from './../../../shared/models/api-error';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  apiError: ApiError;
  user: User = new User();

  constructor(private sessionService: SessionService, private router: Router) { }

  onSubmitLogin(loginForm: FormGroup): void {
    this.sessionService.authenticate(this.user)
      .subscribe(
        (user: User) => {
          loginForm.reset();
          this.router.navigate(['/phones']);
        },
        (error: ApiError) => this.apiError = error
      );
  }
}
