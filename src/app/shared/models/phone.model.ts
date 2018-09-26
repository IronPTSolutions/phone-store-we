export class Phone {
  id?: string;
  name: string;
  brand: string;
  createdAt?: Date;
  updatedAt?: Date;
  image?: string;
  specs: Array<string> = [];
  imageFile?: File;

  public asFormData(): FormData {
    const data = new FormData();

    data.append('brand', this.brand);
    data.append('name', this.name);
    for (const spec of this.specs) {
      data.append('specs', spec);
    }
    data.append('image', this.imageFile ? this.imageFile : this.image);

    return data;
  }
}
