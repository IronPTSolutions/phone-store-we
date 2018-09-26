import { Phone } from './../../../shared/models/phone.model';
import { Component, Output, Input, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
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
  imgPreview: string | ArrayBuffer = PhoneFormComponent.IMG_PREVIEW;

  constructor(private changesDetector: ChangeDetectorRef) { }

  onClickAddSpec(spec: HTMLInputElement): void {
    const specValue: string = spec.value;
    if (specValue && this.phone.specs.indexOf(specValue) === -1) {
      this.phone.specs.push(specValue);
    }
    spec.value = '';
  }

  onClickRemoveSpec(spec: string): void {
    this.phone.specs = this.phone.specs.filter(s => s !== spec);
  }

  onChangeImageFile(image: HTMLInputElement): void {
    if (image.files && image.files[0]) {
      this.phone.imageFile = image.files[0];
      this.renderPreviewImg(image.files[0]);
    }
  }

  onImgPreviewError(): void {
    this.imgPreview = PhoneFormComponent.IMG_PREVIEW;
    this.phone.imageFile = null;
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

  private renderPreviewImg(imageFile: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.phone.imageFile);
    reader.onload = () => {
      this.imgPreview = reader.result;
      this.changesDetector.markForCheck();
    };
  }
}
