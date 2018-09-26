import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { LoginComponent } from './components/misc/login/login.component';
import { PhoneListComponent } from './components/phone/phone-list/phone-list.component';
import { Routes } from '@angular/router';
import { PhoneDetailsComponent } from './components/phone/phone-details/phone-details.component';


export const routes: Routes = [
  { path: '', redirectTo: '/phones', pathMatch: 'full' },
  { path: 'phones', canActivate: [IsAuthenticatedGuard], component: PhoneListComponent },
  { path: 'phones/:id', canActivate: [IsAuthenticatedGuard], component: PhoneDetailsComponent },
  { path: 'login', component: LoginComponent }
];
