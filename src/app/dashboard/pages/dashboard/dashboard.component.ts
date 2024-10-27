import { Component, signal, effect } from '@angular/core';
import { Crop } from '../../../crops/model/crop';
import { CropService } from '../../../crops/services/crop.service';
import { CommonModule } from '@angular/common';
import CropComponent from '../../../crops/component/crop-card/crop-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CropComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export default class DashboardComponent {
  crops = signal<Crop[]>([]);
  selectedCrop = signal<Crop | null>(null);
  currentDate = new Date();

  currentMetrics = signal<
    { description: string; value: number | string; unit: string }[]
  >([
    { description: 'Temperature', value: 22, unit: '°' },
    { description: 'Soil Moisture', value: 65, unit: '%' },
    { description: 'Soil Temperature', value: 18, unit: '°C' },
    { description: 'PH Level', value: 6.5, unit: '' },
  ]);

  deviceStatuses = signal<
    { status: string; label: string; count: number; indicatorClass: string }[]
  >([
    {
      status: 'connected',
      label: 'Connected',
      count: 4,
      indicatorClass: 'connected',
    },
    {
      status: 'disconnected',
      label: 'Disconnected',
      count: 2,
      indicatorClass: 'disconnected',
    },
    {
      status: 'failure',
      label: 'With Failure',
      count: 1,
      indicatorClass: 'failure',
    },
  ]);

  alerts = signal<string[]>([
    'Alerta: Alta Temperatura',
    'Alerta: Humedad Baja',
    'Alerta: Nivel de pH fuera de rango',
  ]);

  devicesStatus = signal<{
    connected: number;
    disconnected: number;
    failure: number;
  }>({
    connected: 4,
    disconnected: 2,
    failure: 1,
  });

  constructor(private cropService: CropService) {
    this.loadCrops();
  }

  loadCrops(): void {
    this.cropService.getAll().subscribe((cropsData: Crop[]) => {
      this.crops.set(cropsData);
      if (cropsData.length > 0) {
        this.selectedCrop.set(cropsData[0]);
      }
    });
  }

  selectCrop(crop: Crop): void {
    this.selectedCrop.set(crop);
  }

  deleteCrop(cropId: number): void {
    this.crops.update((crops) => crops.filter((crop) => crop.id !== cropId));
    this.cropService.delete(cropId).subscribe({
      next: () => {
        if (this.selectedCrop()?.id === cropId) {
          this.selectedCrop.set(null);
        }
      },
      error: () => this.loadCrops(),
    });
  }

  getIconClass(description: string): string {
    switch (description) {
      case 'Temperature':
        return 'fas fa-cloud';
      case 'Soil Moisture':
        return 'fas fa-tint';
      case 'Soil Temperature':
        return 'fas fa-thermometer-half';
      case 'PH Level':
        return 'fas fa-flask';
      default:
        return '';
    }
  }

  getCropAge(plantingDate: Date): string {
    const ageInDays = Math.floor(
      (this.currentDate.getTime() - new Date(plantingDate).getTime()) /
        (1000 * 3600 * 24),
    );
    return `${ageInDays} days`;
  }
}
