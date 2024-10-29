import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Crop } from '../../../crops/model/crop';
import { Analysis } from '../../model/soil';
import { CropService } from '../../../crops/services/crop.service';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';

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
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './soil.component.html',
  styleUrl: './soil.component.css',
})
export default class SoilComponent implements OnInit {
  crops: Crop[] = [];
  selectedCropId: number | null = null;
  selectedSoilAnalysis: Analysis | null = null;
  selectedCropName: string | null = null;
  public pieChartData: { name: string; value: number }[] = [];

  public chartOptions: Partial<ChartOptions> | any;

  private soilAnalyses: Analysis[] = [
    {
      id: 1,
      cropId: 1,
      deviceId: 101,
      analysisDate: '2023-10-25',
      pHLevel: 6.5,
      temperature: 22,
      moisture: 30,
      nitrogen: 10,
      phosphorus: 15,
      potassium: 8,
    },
    {
      id: 2,
      cropId: 2,
      deviceId: 102,
      analysisDate: '2023-10-26',
      pHLevel: 6.8,
      temperature: 24,
      moisture: 28,
      nitrogen: 12,
      phosphorus: 10,
      potassium: 9,
    },
    {
      id: 3,
      cropId: 3,
      deviceId: 103,
      analysisDate: '2023-10-27',
      pHLevel: 6.4,
      temperature: 21,
      moisture: 32,
      nitrogen: 14,
      phosphorus: 20,
      potassium: 11,
    },
  ];

  constructor(private cropService: CropService) {}

  ngOnInit(): void {
    this.loadCrops();
  }

  loadCrops(): void {
    this.cropService.getCropsByFarmer().subscribe({
      next: (cropsData: Crop[]) => {
        this.crops = cropsData;

        if (this.crops.length > 0) {
          this.selectedCropId = this.crops[0].id;
          this.onCropSelect(this.selectedCropId.toString());
        }
      },
      error: (err) => console.error('Error al cargar los cultivos:', err),
    });
  }

  onCropSelect(cropId: string): void {
    const selectedId = Number(cropId);

    if (!isNaN(selectedId)) {
      this.selectedSoilAnalysis =
        this.soilAnalyses.find((analysis) => analysis.cropId === selectedId) ||
        null;
      const selectedCrop = this.crops.find((crop) => crop.id === selectedId);
      this.selectedCropName = selectedCrop ? selectedCrop.cropName : null;

      if (this.selectedSoilAnalysis) {
        this.updateChartData();
      }
    }
  }

  private updateChartData(): void {
    if (this.selectedSoilAnalysis) {
      this.pieChartData = [
        { name: 'Nitrogen', value: this.selectedSoilAnalysis.nitrogen },
        { name: 'Phosphorus', value: this.selectedSoilAnalysis.phosphorus },
        { name: 'Potassium', value: this.selectedSoilAnalysis.potassium },
      ];

      this.chartOptions = {
        series: this.pieChartData.map((data) => data.value),
        chart: {
          type: 'pie',
          width: 400,
        },
        labels: this.pieChartData.map((data) => data.name),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: { width: 300 },
              legend: { position: 'bottom' },
            },
          },
        ],
        title: { text: 'Nutrient Levels' },
      };
    }
  }
}
