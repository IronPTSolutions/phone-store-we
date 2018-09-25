export class Phone {
  id?: string;
  name: string;
  brand: string;
  createdAt?: Date;
  updatedAt?: Date;
  image?: string;
  specs: Array<string> = [];
}
