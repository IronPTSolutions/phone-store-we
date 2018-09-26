import { Phone } from './../../../shared/models/phone.model';
import { Component, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.css']
})
export class PhoneFormComponent {
  private static readonly IMG_PREVIEW: string = 'http://www.nfscars.net/static/img/not-found.png';
  
  @Input() phone: Phone = new Phone();
  @Output() phoneSubmit: EventEmitter<Phone> = new EventEmitter();
  @ViewChild('phoneForm') phoneForm: FormGroup;
  imgPreview: string = PhoneFormComponent.IMG_PREVIEW;

  constructor() { }

  onClickAddSpec(spec: HTMLInputElement): void {
    const specValue: string = spec.value;
    if (specValue && this.phone.specs.indexOf(specValue) === -1) {
      this.phone.specs.push(specValue);
      console.log(this.phone);
    }
    spec.value = '';
  }

  onClickRemoveSpec(spec: string): void {
    this.phone.specs = this.phone.specs.filter(s => s !== spec);
  }

  onChangeImageUrl(image: HTMLInputElement): void {
    this.imgPreview = image.value;
  }

  onImgPreviewError(): void {
    this.imgPreview = PhoneFormComponent.IMG_PREVIEW;
  }

  onSubmitPhoneForm(): void {
    if (this.phoneForm.valid) {
      this.phoneSubmit.emit(this.phone);
    }
  }

  reset(): void {
    this.imgPreview = PhoneFormComponent.IMG_PREVIEW;
    this.phone = new Phone();
    this.phoneForm.reset();
  }

  canDeactivate(): boolean {
    return this.phoneForm.dirty ? window.confirm('Discard changes for Phone? Are you sure?') : true;
  }
}
