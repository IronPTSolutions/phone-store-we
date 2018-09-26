import { PhoneService } from './../../../shared/services/phone.service';
import { Phone } from './../../../shared/models/phone.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.css']
})
export class PhoneDetailsComponent implements OnInit {
  phone: Phone = new Phone();

  constructor(private phoneService: PhoneService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .pipe(
        map((params => params.id)),
        switchMap(id => this.phoneService.get(id))
      ).subscribe((phone: Phone) => this.phone = phone);
  }

}
