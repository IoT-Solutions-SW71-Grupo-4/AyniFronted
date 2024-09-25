import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Crop, SoilAnalysis } from '../../irrigation/model/data.model';  

@Injectable({
  providedIn: 'root'
})
export class SoilAnalysisService {

  private data = {
    crops: [
      {
        id: 1,
        farmerId: 1,
        name: 'Maíz',
        fieldSize: 1.5,
        plantingDate: '2024-09-01',
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
        image: 'https://example.com/images/crop1.jpg'
      },
      {
        id: 2,
        farmerId: 1,
        name: 'Trigo',
        fieldSize: 2.0,
        plantingDate: '2024-09-05',
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
        image: 'https://example.com/images/crop2.jpg'
      }
    ]
  };

  private crops: any = this.data.crops; 

  getCrops(): Crop[] {
    return this.crops;
  }
  getSoilAnalysis(cropId: number): SoilAnalysis | null {
    const crop = this.crops.find((c: { id: number; }) => c.id === cropId);
    return crop?.soilAnalysis || null;
  }
}
