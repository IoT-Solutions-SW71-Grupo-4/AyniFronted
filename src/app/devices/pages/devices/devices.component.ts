import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '../../models/device';
import { CropService } from '../../../crops/services/crop.service';
import { CommonModule } from '@angular/common';
import AddDeviceComponent from '../../components/add-device/add-device.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [CommonModule, AddDeviceComponent, FormsModule],
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export default class DevicesComponent implements OnInit {
  crops = signal<{ id: number; name: string }[]>([]);

  devices = signal<Device[]>([
    {
      id: 1,
      name: 'Sensor 1',
      status: 'active',
      lastReading: new Date('2023-03-14'),
      type: 'sensor',
      cropId: 1,
      installationDate: new Date('2022-12-31'),
    },
    {
      id: 2,
      name: 'Sensor 2',
      status: 'inactive',
      lastReading: new Date('2023-02-19'),
      type: 'sensor',
      cropId: 2,
      installationDate: new Date('2023-01-31'),
    },
    {
      id: 3,
      name: 'Sensor 3',
      status: 'active',
      lastReading: new Date('2023-01-10'),
      type: 'actuator',
      cropId: 1,
      installationDate: new Date('2022-11-20'),
    },
  ]);

  selectedDevice = signal<Device | null>(null);
  isAddingDevice = signal(false);
  selectedCropId = signal<number | null>(null);
  filteredDevices = signal<Device[]>([]);

  constructor(
    private router: Router,
    private cropService: CropService,
  ) {}

  ngOnInit(): void {
    this.loadCrops().then(() => {
      this.selectedCropId.set(null);
      this.filterDevicesByCrop();
    });
  }

  async loadCrops() {
    try {
      const crops = await this.cropService.getCropsByFarmer().toPromise();
      if (crops) {
        this.crops.set(
          crops.map((crop) => ({ id: crop.id, name: crop.cropName })),
        );
      }
    } catch (error) {
      console.error('Failed to load crops:', error);
    }
  }

  selectDevice(device: Device) {
    this.selectedDevice.set(device);
  }

  deleteDevice(device: Device) {
    this.devices.update((devices) => devices.filter((d) => d.id !== device.id));
    this.filterDevicesByCrop();
  }

  addDevice(device: Device) {
    if (typeof device.cropId !== 'number') {
      device.cropId = Number(device.cropId);
    }

    if (device) {
      this.devices.update((devices) => [...devices, device]);
      this.filterDevicesByCrop();
      this.selectedDevice.set(device);
    }
    this.cancelAdding();
  }

  filterDevicesByCrop() {
    const cropId = this.selectedCropId();
    let filtered;

    if (cropId === null) {
      filtered = [...this.devices()];
    } else {
      filtered = this.devices().filter(
        (device) => device.cropId === Number(cropId),
      );
    }

    this.filteredDevices.set(filtered);

    const selected = this.selectedDevice();
    if (!selected || !filtered.some((device) => device.id === selected.id)) {
      this.selectedDevice.set(filtered.length > 0 ? filtered[0] : null);
    }
  }

  startAddingDevice() {
    this.isAddingDevice.set(true);
  }

  getCropName(cropId: number | null): string {
    if (typeof cropId !== 'number') {
      console.warn('Invalid cropId:', cropId);
      return 'Unknown Crop';
    }
    const crop = this.crops().find((c) => c.id === cropId);
    return crop ? crop.name : 'Unknown Crop';
  }

  cancelAdding() {
    this.isAddingDevice.set(false);
  }

  toggleDeviceStatus(device: Device) {
    const currentSelectedDevice = this.selectedDevice();
    this.devices.update((devices) =>
      devices.map((d) =>
        d.id === device.id
          ? { ...d, status: d.status === 'active' ? 'inactive' : 'active' }
          : d,
      ),
    );
    this.filterDevicesByCrop();

    if (currentSelectedDevice && currentSelectedDevice.id === device.id) {
      this.selectedDevice.set(
        this.filteredDevices().find((d) => d.id === device.id) || null,
      );
    }
  }
}
