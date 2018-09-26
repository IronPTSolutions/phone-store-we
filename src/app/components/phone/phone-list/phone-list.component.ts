import { PhoneCreateComponent } from './../phone-create/phone-create.component';
import { ApiError } from '../../../shared/models/api-error.model';
import { PhoneService } from './../../../shared/services/phone.service';
import { Phone } from './../../../shared/models/phone.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html'
})
export class PhoneListComponent implements OnInit, OnDestroy {
  phones: Array<Phone> = [];
  onPhonesChangesSubscription: Subscription;
  @ViewChild(PhoneCreateComponent) phoneCreateComponent: PhoneCreateComponent;

  constructor(private phoneService: PhoneService) {}

  ngOnInit() {
    this.phoneService.list()
      .subscribe(
        (phones: Phone[]) => this.phones = phones
      );
    this.onPhonesChangesSubscription = this.phoneService.onPhonesChanges()
      .subscribe(
        (phones: Phone[]) => this.phones = phones
      );
  }

  ngOnDestroy() {
    this.onPhonesChangesSubscription.unsubscribe();
  }

  canDeactivate(): boolean {
    return this.phoneCreateComponent.canDeactivate();
  }

}
