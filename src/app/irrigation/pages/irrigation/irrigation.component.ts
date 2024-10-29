import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CropService } from '../../../crops/services/crop.service';
import { Crop } from '../../../crops/model/crop';
import { Irrigation } from '../../model/irrigation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-irrigation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './irrigation.component.html',
  styleUrl: './irrigation.component.css',
})
export default class IrrigationComponent implements OnInit {
  crops: Crop[] = [];
  selectedCrop: Crop | null = null;
  irrigationData: Irrigation = new Irrigation();
  manualDuration: number = 0;
  feedbackMessage: string = '';

  constructor(private cropService: CropService) {}

  ngOnInit(): void {
    this.loadCrops();
  }

  loadCrops(): void {
    this.cropService.getCropsByFarmer().subscribe({
      next: (cropsData: Crop[]) => {
        this.crops = cropsData;
        if (this.crops.length > 0) {
          this.selectedCrop = this.crops[0];
        }
      },
      error: (err) => console.error('Error al cargar los cultivos:', err),
    });
  }

  startManualIrrigation(): void {
    if (this.selectedCrop && this.irrigationData.mode !== 'automatic') {
      this.irrigationData.mode = 'manual';
      this.irrigationData.isCurrentlyIrrigating = true;
      this.irrigationData.automaticIrrigationEnabled = false;
      this.irrigationData.duration = this.manualDuration;
      this.feedbackMessage = `Manual irrigation started for ${this.manualDuration} minutes.`;
    } else if (this.irrigationData.mode === 'automatic') {
      this.feedbackMessage =
        'Error: Cannot start manual irrigation while automatic irrigation is enabled.';
    }
  }

  stopManualIrrigation(): void {
    this.irrigationData.isCurrentlyIrrigating = false;
    this.feedbackMessage = 'Manual irrigation stopped.';
  }

  scheduleAutomaticIrrigation(): void {
    if (!this.irrigationData.consentGiven) {
      this.feedbackMessage =
        'Error: Consent not given for automatic irrigation.';
      return;
    }
    if (this.irrigationData.mode !== 'manual') {
      this.irrigationData.mode = 'automatic';
      this.irrigationData.isCurrentlyIrrigating = false;
      this.irrigationData.automaticIrrigationEnabled = true;
      this.feedbackMessage = 'Automatic irrigation scheduled.';
    } else {
      this.feedbackMessage =
        'Error: Cannot enable automatic irrigation while manual irrigation is active.';
    }
  }

  toggleView(): void {
    this.irrigationData.mode =
      this.irrigationData.mode === 'manual' ? 'automatic' : 'manual';
    this.irrigationData.isCurrentlyIrrigating = false;
    this.irrigationData.automaticIrrigationEnabled = false;
    this.feedbackMessage = '';
  }
}
