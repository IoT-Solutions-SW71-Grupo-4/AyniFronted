import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SensorService } from '../../services/sensor.service';
import { Sensor } from '../../model/sensor.model';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.css']
})
export class AddSensorComponent {
  sensor: Sensor = {
    id: 0,
    name: '',
    status: '',
    lastReading: '',
    battery: 0,
    installationDate: '',
    threshold: 0
  };

  constructor(private router: Router, private sensorService: SensorService) {}

    addSensor() {
    this.sensorService.addSensor(this.sensor);
    this.router.navigate(['/devices']);   }

 
  cancel() {
    this.router.navigate(['/devices']);
  }
}
