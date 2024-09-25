import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorService } from '../../services/sensor.service';
import { Sensor } from '../../model/sensor.model';


@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit {
  sensor: Sensor = {
    id: 0,
    name: '',
    status: '',
    lastReading: '',
    battery: 0,
    installationDate: '',
    threshold: 0,
  };

  constructor(private route: ActivatedRoute, private router: Router, private sensorService: SensorService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const selectedSensor = this.sensorService.getSensorById(id);
    
    if (selectedSensor) {
      this.sensor = { ...selectedSensor };
    }
  }

  saveChanges() {
    this.sensorService.updateSensor(this.sensor);
    console.log('Changes saved for:', this.sensor);
    this.router.navigate(['/devices']);
  }

 
  cancelEdit() {
    this.router.navigate(['/devices']);
  }
}
