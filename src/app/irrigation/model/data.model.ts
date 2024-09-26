
export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    name: string;
    profilePicture: string;
  }
  
  export interface IrrigationData {
    cropId: number;
    lastIrrigation: string;
    irrigationDuration: number;
    automaticIrrigationEnabled: boolean;
    manualIrrigationEnabled: boolean;
    sensorThreshold: number;
    currentSoilMoisture: number;
    consentGiven: boolean;
    isCurrentlyIrrigating: boolean;
  }
  
  export interface SoilAnalysis {
    cropId: number;
    analysisDate: string;
    pHLevel: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    organicMatter: number;
    moisture: number;
  }
  
  export interface Location {
    latitude: number;
    longitude: number;
  }
  
  export interface Crop {
    id: number;
    farmerId: number;
    name: string;
    fieldSize: number;
    plantingDate: string;
    irrigationData: IrrigationData;
    soilAnalysis: SoilAnalysis;
    location: Location;
    image: string;
  }
  
  export interface Device {
    id: number;
    name: string;
    type: string;
    location: string;
    lastReading: {
      timestamp: string;
      moistureLevel: number;
    };
    image: string;
  }
  
  export interface Notification {
    id: number;
    message: string;
    timestamp: string;
    read: boolean;
  }
  
  export interface Report {
    id: number;
    cropId: number;
    reportDate: string;
    summary: string;
    image: string;
  }
  
  export interface Data {
    users: User[];
    crops: Crop[];
    devices: Device[];
    notifications: Notification[];
    reports: Report[];
  }
  