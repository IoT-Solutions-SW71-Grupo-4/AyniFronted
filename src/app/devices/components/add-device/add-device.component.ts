import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from '../../models/device';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-device',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css'],
})
export default class AddDeviceComponent {
  device: Device = new Device();

  @Input() crops: { id: number | null; name: string }[] = [];
  @Output() deviceAdded = new EventEmitter<Device>();

  constructor() {}

  addDevice() {
    if (typeof this.device.cropId !== 'number') {
      this.device.cropId = Number(this.device.cropId);
    }
    this.device.id = Date.now();
    this.deviceAdded.emit({ ...this.device });
  }

  cancelAdding() {
    this.deviceAdded.emit(undefined);
  }
}
