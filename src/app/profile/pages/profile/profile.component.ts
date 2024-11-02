import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { FarmerService } from '../../services/farmer.service';
import { Farmer } from '../../model/farmer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export default class ProfileComponent implements OnInit {
  farmerId!: number;
  farmer!: Farmer;
  imagePreviewUrl: string | ArrayBuffer | null = '';
  editMode = false;
  constructor(private farmerService: FarmerService, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.currentUserId.subscribe((id: number) => {
      this.farmerId = id;
    });
    
    this.farmerService.getById(this.farmerId).subscribe((data) => {
      this.farmer = data;
      this.imagePreviewUrl = this.farmer.imageUrl?? 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';
   
    });
  }

  updateFarmer(): void {
    this.farmerService.update(this.farmer.id, this.farmer).subscribe(() => {
      alert('Perfil actualizado correctamente');
      this.editMode = false;
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(file);
      this.farmerService.updateFarmerImage(this.farmer.id, file).subscribe(() => {
        alert('Imagen de perfil actualizada');
      });
    }
  }

  deleteImage(): void {
    this.farmerService.deleteFarmerImage(this.farmer.id).subscribe(() => {
      this.imagePreviewUrl = null;
      alert('Imagen de perfil eliminada');
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
}
