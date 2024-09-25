import { Component, OnInit } from '@angular/core';
import { Crop, SoilAnalysis } from 'src/app/irrigation/model/data.model';
import { SoilAnalysisService } from 'src/app/soilAnalisys/services/analysis.service';

@Component({
  selector: 'app-soil-analysis',
  templateUrl: './soil-analysis.component.html',
  styleUrls: ['./soil-analysis.component.css'],
})
export class SoilAnalysisComponent implements OnInit {
  crops: Crop[] = [];
  selectedCropId: number | null = null;
  selectedSoilAnalysis: SoilAnalysis | null = null;
  selectedCropName: string | null = null;

  public pieChartData: { name: string; value: number }[] = [];

  constructor(private soilAnalysisService: SoilAnalysisService) {}

  ngOnInit(): void {
    this.crops = this.soilAnalysisService.getCrops();

    if (this.crops.length > 0) {
      this.selectedCropId = this.crops[0].id;
      this.onCropSelect(this.selectedCropId.toString());
    }
  }

  onCropSelect(cropId: string): void {
    const selectedId = Number(cropId);

    if (!isNaN(selectedId)) {
      this.selectedSoilAnalysis = this.soilAnalysisService.getSoilAnalysis(selectedId);
      const selectedCrop = this.crops.find(c => c.id === selectedId);
      this.selectedCropName = selectedCrop ? selectedCrop.name : null;
      
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
    }
  }
}
