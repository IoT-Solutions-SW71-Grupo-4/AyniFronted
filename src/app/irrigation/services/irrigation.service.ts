import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; 
import { tap } from 'rxjs/operators';
import { Data, Crop } from '../model/data.model';

@Injectable({
  providedIn: 'root',
})
export class IrrigationService {
  private data: Data = {
    users: [
      {
        id: 1,
        username: 'farmer1',
        password: 'password123',
        email: 'farmer1@example.com',
        name: 'Juan Pérez',
        profilePicture: 'https://i.pinimg.com/550x/a8/0e/36/a80e3690318c08114011145fdcfa3ddb.jpg',
      },
      {
        id: 2,
        username: 'farmer2',
        password: 'password456',
        email: 'farmer2@example.com',
        name: 'María López',
        profilePicture: 'https://i.pinimg.com/550x/a8/0e/36/a80e3690318c08114011145fdcfa3ddb.jpg',
      }
    ],
    crops: [
      {
        id: 1,
        farmerId: 1,
        name: 'Maíz',
        fieldSize: 1.5,
        plantingDate: '2024-09-01',
        irrigationData: {
          cropId: 1,
          lastIrrigation: '2024-09-20',
          irrigationDuration: 30,
          automaticIrrigationEnabled: true,
          manualIrrigationEnabled: true,
          sensorThreshold: 50,
          currentSoilMoisture: 45,
          consentGiven: true,
          isCurrentlyIrrigating: false
        },
        soilAnalysis: {
          cropId: 1,
          analysisDate: '2024-09-15',
          pHLevel: 6.5,
          nitrogen: 20,
          phosphorus: 15,
          potassium: 10,
          organicMatter: 5,
          moisture: 40
        },
        location: {
          latitude: 0,
          longitude: 0
        },
        image:'https://img.freepik.com/foto-gratis/gran-paisaje-verde-cubierto-cesped-rodeado-arboles_181624-14827.jpg' 
    },
      {
        id: 2,
        farmerId: 1,
        name: 'Trigo',
        fieldSize: 2.0,
        plantingDate: '2024-09-05',
        irrigationData: {
          cropId: 2,
          lastIrrigation: '2024-09-21',
          irrigationDuration: 25,
          automaticIrrigationEnabled: true,
          manualIrrigationEnabled: true,
          sensorThreshold: 40,
          currentSoilMoisture: 35,
          consentGiven: true,
          isCurrentlyIrrigating: false
        },
        soilAnalysis: {
          cropId: 2,
          analysisDate: '2024-09-10',
          pHLevel: 6.0,
          nitrogen: 18,
          phosphorus: 14,
          potassium: 8,
          organicMatter: 6,
          moisture: 30
        },
        location: {
          latitude: 0,
          longitude: 0
        },
        image:'https://img.freepik.com/foto-gratis/gran-paisaje-verde-cubierto-cesped-rodeado-arboles_181624-14827.jpg' 
    },
    ],
    devices: [
      {
        id: 1,
        name: 'Sensor de Humedad 1',
        type: 'Soil Moisture Sensor',
        location: 'Campo 1',
        lastReading: {
          timestamp: '2024-09-24T12:00:00Z',
          moistureLevel: 45
        },
        image: 'https:     '
     },
      {
        id: 2,
        name: 'Sensor de Humedad 2',
        type: 'Soil Moisture Sensor',
        location: 'Campo 2',
        lastReading: {
          timestamp: '2024-09-24T12:00:00Z',
          moistureLevel: 35
        },
        image: 'https:     '
     }
    ],
    notifications: [
      {
        id: 1,
        message: 'El riego automático para el cultivo de Maíz ha comenzado.',
        timestamp: '2024-09-20T09:00:00Z',
        read: false
      },
      {
        id: 2,
        message: 'El análisis de suelo para el cultivo de Trigo ha sido actualizado.',
        timestamp: '2024-09-21T10:00:00Z',
        read: true
      }
    ],
    reports: [
      {
        id: 1,
        cropId: 1,
        reportDate: '2024-09-25',
        summary: 'El cultivo de maíz ha recibido riego automático y muestra niveles saludables de humedad.',
        image: 'https:     '
     },
      {
        id: 2,
        cropId: 2,
        reportDate: '2024-09-25',
        summary: 'El cultivo de trigo ha tenido un aumento en los niveles de nitrógeno.',
        image: 'https:     '
     }
    ]
  };

  private crops: Crop[] = this.data.crops; 
  constructor() {
      }

    getCrops(): Crop[] {
    return this.crops;   }

    startManualIrrigation(cropId: number, duration: number): string {
    const crop = this.findCropById(cropId);
    if (crop) {
      if (crop.irrigationData.isCurrentlyIrrigating) {
        return 'El riego ya está en progreso. Por favor, espera a que termine.';
      }
      crop.irrigationData.lastIrrigation = new Date().toLocaleString();
      crop.irrigationData.irrigationDuration = duration;
      crop.irrigationData.isCurrentlyIrrigating = true;

      setTimeout(() => {
        crop.irrigationData.isCurrentlyIrrigating = false;
      }, duration * 60000);

      return `Riego manual iniciado para ${crop.name} por ${duration} minutos.`;
    }
    return 'Error: Cultivo no encontrado.';
  }

    stopManualIrrigation(cropId: number): string {
    const crop = this.findCropById(cropId);
    if (crop) {
      if (!crop.irrigationData.isCurrentlyIrrigating) {
        return 'No hay riego manual en progreso.';
      }
      crop.irrigationData.isCurrentlyIrrigating = false;
      return `Riego manual detenido para ${crop.name}.`;
    }
    return 'Error: Cultivo no encontrado.';
  }

    scheduleAutomaticIrrigation(cropId: number): string {
    const crop = this.findCropById(cropId);
    if (crop) {
      if (!crop.irrigationData.consentGiven) {
        return 'Error: El agricultor no ha dado su consentimiento para el riego automático.';
      }
      if (crop.irrigationData.isCurrentlyIrrigating) {
        return 'El riego ya está en progreso. Por favor, espera a que termine.';
      }

      if (crop.irrigationData.currentSoilMoisture < crop.irrigationData.sensorThreshold) {
        crop.irrigationData.isCurrentlyIrrigating = true;
        crop.irrigationData.lastIrrigation = new Date().toLocaleString();
        crop.irrigationData.irrigationDuration = 30; 
        setTimeout(() => {
          crop.irrigationData.isCurrentlyIrrigating = false;
        }, 30 * 60000);

        return `Riego automático iniciado para ${crop.name} porque la humedad del suelo está por debajo del umbral.`;
      }

      return `No es necesario el riego automático para ${crop.name}. La humedad del suelo es adecuada.`;
    }
    return 'Error: Cultivo no encontrado.';
  }

    private findCropById(cropId: number): Crop | undefined {
    return this.crops.find(c => c.id === cropId);
  }
}
