import { ApiError } from '../../../shared/models/api-error.model';
import { PhoneService } from './../../../shared/services/phone.service';
import { Phone } from './../../../shared/models/phone.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html'
})
export class PhoneListComponent implements OnInit {
  phones: Array<Phone> = [];

  constructor(private phoneService: PhoneService) {}

  ngOnInit() {
    this.phoneService.list()
      .subscribe(
        (phones: Phone[]) => this.phones = phones
      );
  }

}
