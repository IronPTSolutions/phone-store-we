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

  constructor(private router: Router) {}

  onClickPhone(): void {
    this.router.navigate(['/phones', this.phone.id]);
  }
}
