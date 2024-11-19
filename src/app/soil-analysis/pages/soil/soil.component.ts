import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';

import { Crop } from '../../../crops/model/crop';
import { Analysis } from '../../model/soil';
import { Weather } from '../../model/weather';
import { CropService } from '../../../crops/services/crop.service';
import { SoilService } from '../../services/soil.service';
import { WeatherService } from '../../services/weather.service';
import { DeviceService } from '../../../devices/services/device.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  responsive: ApexResponsive[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-soil',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, FormsModule],
  templateUrl: './soil.component.html',
  styleUrls: ['./soil.component.css'],
})
export default class SoilComponent implements OnInit {
  crops: Crop[] = [];
  selectedCropId: number | null = null;

  
  chartOptions: Partial<ChartOptions>;
  lastSoilAnalysis: Analysis | null = null;
  associatedDeviceCode: string | null = null;

  
  lastWeatherReport: Weather | null = null;

  
  currentView: 'main' | 'weather-history' | 'soil-history' = 'main';

  
  weatherReports: Weather[] = [];
  soilReports: Analysis[] = [];

  
  statusMessage: string | null = null;

  constructor(
    private cropService: CropService,
    private soilService: SoilService,
    private weatherService: WeatherService,
    private deviceService: DeviceService
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: ['Nitrogen', 'Phosphorus', 'Potassium'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      title: {
        text: 'Soil Nutrient Composition',
        align: 'center',
      },
    };
  }

  ngOnInit(): void {
    this.loadCrops();
  }

  /**
   * Cargar los cultivos disponibles.
   */
  loadCrops(): void {
    this.cropService.getCropsByFarmer().subscribe({
      next: (cropsData) => {
        this.crops = cropsData;
        if (this.crops.length > 0) {
          this.selectedCropId = this.crops[0].id;
          this.loadSoilAndWeatherData();
        }
      },
      error: (error) => {
        console.error('Error loading crops:', error);
        this.statusMessage = 'Failed to load crops.';
      },
    });
  }
  loadSoilAndWeatherData(): void {
    if (!this.selectedCropId) {
      this.statusMessage = 'Please select a crop.';
      return;
    }

    
    this.soilService.getLastSoilReportByCrop(this.selectedCropId).subscribe({
      next: (analysis) => {
        this.lastSoilAnalysis = analysis;
        if (analysis.deviceId) {
          this.loadDeviceCode(analysis.deviceId);
        }
        this.chartOptions.series = [
          analysis.nitrogen,
          analysis.phosphorus,
          analysis.potassium,
        ];
      },
      error: (error) => {
        console.error('Error fetching last soil report:', error);
        this.statusMessage = 'Failed to fetch soil report.';
      },
    });

    
    this.weatherService.getLastWeatherReportByCrop(this.selectedCropId).subscribe({
      next: (lastReport) => {
        this.lastWeatherReport = lastReport;
      },
      error: (error) => {
        console.error('Error fetching last weather report:', error);
        this.statusMessage = 'Failed to fetch weather report.';
      },
    });
  }

  loadDeviceCode(deviceId: number): void {
    this.deviceService.getById(deviceId).subscribe({
      next: (device) => {
        this.associatedDeviceCode = device.deviceCode;
      },
      error: (error) => {
        console.error('Error fetching device code:', error);
        this.statusMessage = 'Failed to fetch device code.';
      },
    });
  }


  /**
   * Enviar solicitud de análisis de suelo.
   */
  sendSoilAnalysisRequest(): void {
    if (!this.associatedDeviceCode) {
      this.statusMessage = 'No associated device code found.';
      return;
    }

    this.soilService.requestSoilAnalysis(this.associatedDeviceCode).subscribe({
      next: (response) => {
        this.showTemporaryMessage(response);
        this.loadSoilAndWeatherData(); 
      },
      error: (error) => {
        console.error('Error sending soil analysis request:', error);
        this.showTemporaryMessage('Failed to send soil analysis request.');
      },
    });
  }

  /**
   * Cargar el historial de reportes climáticos.
   */
  loadWeatherHistory(): void {
    if (!this.selectedCropId) {
      this.statusMessage = 'Please select a crop.';
      return;
    }

    this.weatherService.getWeatherReportsByCrop(this.selectedCropId).subscribe({
      next: (reports) => {
        this.weatherReports = reports;
        this.currentView = 'weather-history';
      },
      error: (error) => {
        console.error('Error fetching weather history:', error);
        this.statusMessage = 'Failed to fetch weather history.';
      },
    });
  }

  /**
   * Cargar el historial de análisis de suelo.
   */
  loadSoilHistory(): void {
    if (!this.selectedCropId) {
      this.statusMessage = 'Please select a crop.';
      return;
    }

    this.soilService.getSoilReportsByCrop(this.selectedCropId).subscribe({
      next: (reports) => {
        this.soilReports = reports;
        this.currentView = 'soil-history';
      },
      error: (error) => {
        console.error('Error fetching soil history:', error);
        this.statusMessage = 'Failed to fetch soil history.';
      },
    });
  }

  /**
   * Regresar a la vista principal.
   */
  backToMainView(): void {
    this.currentView = 'main';
  }

  showTemporaryMessage(message: string): void {
    this.statusMessage = message;
    setTimeout(() => {
      this.statusMessage = null;
    }, 5000); 
  }
}
