import { PhoneFormComponent } from './../phone-form/phone-form.component';
import { Phone } from './../../../shared/models/phone.model';
import { PhoneService } from './../../../shared/services/phone.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-phone-create',
  templateUrl: './phone-create.component.html'
})
export class PhoneCreateComponent implements OnInit {
  
  @ViewChild(PhoneFormComponent) phoneFormComponent: PhoneFormComponent;

  constructor(private phoneService: PhoneService) { }

  ngOnInit() {
  }

  onSubmitCreatePhoneForm(phone: Phone): void {
    this.phoneService.create(phone)
      .subscribe((phone: Phone) => {
        this.phoneFormComponent.reset();
      });
  }

}
