import { PhoneService } from './../../../shared/services/phone.service';
import { Router } from '@angular/router';
import { Phone } from './../../../shared/models/phone.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-phone-item',
  templateUrl: './phone-item.component.html',
  styleUrls: ['./phone-item.component.css']
})
export class PhoneItemComponent {
  @Input() phone: Phone = new Phone();

  constructor(private phoneService: PhoneService, private router: Router) {}

  onClickPhone(): void {
    this.router.navigate(['/phones', this.phone.id]);
  }

  onClickDeletePhone(): void {
    this.phoneService.delete(this.phone.id)
      .subscribe(() => {});
  }
}
