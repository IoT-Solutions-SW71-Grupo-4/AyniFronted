import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sensor } from '../../../devices/model/sensor.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {
  sensors: Sensor[] = [
    { id: 1, name: 'Sensor 1', status: 'Active', lastReading: '20%', battery: 85, installationDate: '2023-01-01', threshold: 30 },
    { id: 2, name: 'Sensor 2', status: 'Inactive', lastReading: '15%', battery: 60, installationDate: '2023-02-01', threshold: 25 },
      ];

  selectedSensor: Sensor | null = null;

  constructor(private router: Router) {}

    selectSensor(sensor: Sensor) {
    this.selectedSensor = sensor;
  }

    editSensor(sensor: Sensor) {
    this.router.navigate(['/devices/edit', sensor.id]);
  }

    deleteSensor(sensor: Sensor) {
    this.sensors = this.sensors.filter(s => s.id !== sensor.id);
  }

    addNewSensor() {
    this.router.navigate(['/devices/add']);
  }
}
