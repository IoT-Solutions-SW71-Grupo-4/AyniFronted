export class Analysis {
  id: number;
  cropId: number;
  deviceId: number;
  analysisDate: string;
  pHLevel: number;
  temperature: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;

  constructor() {
    this.id = 0;
    this.cropId = 0;
    this.deviceId = 0;
    this.analysisDate = '';
    this.pHLevel = 0;
    this.temperature = 0;
    this.moisture = 0;
    this.nitrogen = 0;
    this.phosphorus = 0;
    this.potassium = 0;
  }
}
