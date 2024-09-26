import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sensor } from '../model/sensor.model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

    private sensorsSubject: BehaviorSubject<Sensor[]> = new BehaviorSubject<Sensor[]>([
    { id: 1, name: 'Sensor 1', status: 'Active', lastReading: '20%', battery: 85, installationDate: '2023-01-01', threshold: 30 },
    { id: 2, name: 'Sensor 2', status: 'Inactive', lastReading: '15%', battery: 60, installationDate: '2023-02-01', threshold: 25 }
  ]);

  constructor() {}

    getSensors(): Observable<Sensor[]> {
    return this.sensorsSubject.asObservable();
  }

  addSensor(newSensor: Sensor) {
    const sensors = this.sensorsSubject.getValue();
    newSensor.id = sensors.length ? Math.max(...sensors.map(s => s.id)) + 1 : 1;     this.sensorsSubject.next([...sensors, newSensor]);   }
  
    getSensorById(id: number): Sensor | undefined {
    const sensors = this.sensorsSubject.getValue();
    return sensors.find(sensor => sensor.id === id);
  }

    updateSensor(updatedSensor: Sensor) {
    const sensors = this.sensorsSubject.getValue();
    const index = sensors.findIndex(sensor => sensor.id === updatedSensor.id);

    if (index !== -1) {
      sensors[index] = updatedSensor;
      this.sensorsSubject.next([...sensors]);      }
  }

    deleteSensor(id: number) {
    const sensors = this.sensorsSubject.getValue();
    const updatedSensors = sensors.filter(sensor => sensor.id !== id);
    this.sensorsSubject.next([...updatedSensors]);    }
}
