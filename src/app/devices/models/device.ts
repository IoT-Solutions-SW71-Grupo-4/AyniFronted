export class Device {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  lastReading: Date;
  type: string;
  cropId: number;
  installationDate: Date;
  constructor() {
    this.id = 0;
    this.name = '';
    this.status = 'inactive';
    this.lastReading = new Date();
    this.type = '';
    this.cropId = 0;
    this.installationDate = new Date();
  }
}
