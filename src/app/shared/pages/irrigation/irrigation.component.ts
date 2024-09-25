import { Component, OnInit } from '@angular/core';
import { IrrigationService } from '../../../irrigation/services/irrigation.service';
import { Crop } from '../../../irrigation/model/data.model';

@Component({
  selector: 'app-irrigation',
  templateUrl: './irrigation.component.html',
  styleUrls: ['./irrigation.component.css'],
})
export class IrrigationComponent implements OnInit {
  crops: Crop[] = [];
  selectedCrop: Crop | null = null;
  manualDuration: number = 0;
  showAutomaticIrrigation: boolean = false;   feedbackMessage: string = ''; 
  constructor(private irrigationService: IrrigationService) {}

  ngOnInit(): void {
    this.loadCrops();   }

  loadCrops(): void {
    this.crops = this.irrigationService.getCrops();     this.selectedCrop = this.crops[0] || null;   }

  startManualIrrigation(): void {
    if (this.selectedCrop) {
      const message = this.irrigationService.startManualIrrigation(this.selectedCrop.id, this.manualDuration);
      this.feedbackMessage = message;     }
  }

  stopManualIrrigation(): void {
    if (this.selectedCrop) {
      const message = this.irrigationService.stopManualIrrigation(this.selectedCrop.id);
      this.feedbackMessage = message;     }
  }

  scheduleAutomaticIrrigation(): void {
    if (this.selectedCrop) {
      if (!this.selectedCrop.irrigationData.consentGiven) {
        this.feedbackMessage = 'Error: The farmer has not given consent for automatic irrigation.';
        return;
      }
      const message = this.irrigationService.scheduleAutomaticIrrigation(this.selectedCrop.id);
      this.feedbackMessage = message;     } else {
      this.feedbackMessage = 'Error: No crop has been selected.';
    }
  }

  toggleView(): void {
    this.showAutomaticIrrigation = !this.showAutomaticIrrigation;     this.feedbackMessage = '';   }
}
