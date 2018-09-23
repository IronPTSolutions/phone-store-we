import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { LoginComponent } from './components/misc/login/login.component';
import { PhoneListComponent } from './components/phone/phone-list/phone-list.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: '/phones', pathMatch: 'full' },
  { path: 'phones', canActivate: [IsAuthenticatedGuard], component: PhoneListComponent },
  { path: 'login', component: LoginComponent }
];
