import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { FarmerService } from '../../services/farmer.service';
import { Farmer } from '../../model/farmer';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserStateService } from '../../../shared/services/user-state.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export default class ProfileComponent implements OnInit {
  farmer!: Farmer;
  imagePreviewUrl: string | ArrayBuffer | null = '';
  editMode = false;
  feedbackMessage = '';
  feedbackType: 'success' | 'error' = 'success';

  constructor(
    private farmerService: FarmerService,
    private userState: UserStateService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authenticationService.currentUserId.subscribe((id: number) => {
      if (id) {
        this.loadFarmerDetails(id);
      } else {
        console.error('User ID not found');
      }
    });
  }

  private loadFarmerDetails(id: number): void {
    this.farmerService.getById(id).subscribe({
      next: (data) => {
        this.farmer = data;
        this.imagePreviewUrl = data.imageUrl;
        this.userState.updateUser(
          data.username,
          data.imageUrl
        );
      },
      error: () => {
        this.showFeedback('Error loading profile details.', 'error');
      },
    });
  }

  updateFarmer(): void {
    this.farmerService.update(this.farmer.id, this.farmer).subscribe({
      next: () => {
        this.userState.updateUser(this.farmer.username, this.imagePreviewUrl as string);
        this.editMode = false;
        this.showFeedback('Profile information updated successfully!', 'success');
      },
      error: () => {
        this.showFeedback('Error updating profile information.', 'error');
      },
    });
  }

  updateImage(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.uploadImage(file);
      }
    });

    fileInput.click();
  }

  private uploadImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result;
    };
    reader.readAsDataURL(file);

    this.farmerService.updateFarmerImage(this.farmer.id, file).subscribe({
      next: () => {
        this.userState.updateUser(this.farmer.username, this.imagePreviewUrl as string);
        this.showFeedback('Profile image updated successfully!', 'success');
      },
      error: () => {
        this.showFeedback('Error updating profile image.', 'error');
      },
    });
  }

  deleteImage(): void {
    this.farmerService.deleteFarmerImage(this.farmer.id).subscribe({
      next: () => {
        this.imagePreviewUrl = '';
        this.userState.updateUser(this.farmer.username, this.imagePreviewUrl as string);
        this.showFeedback('Profile image deleted successfully!', 'success');
      },
      error: () => {
        this.showFeedback('Error deleting profile image.', 'error');
      },
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.feedbackMessage = ''; // Clear feedback message when switching modes
  }

  private showFeedback(message: string, type: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
    setTimeout(() => (this.feedbackMessage = ''), 3000); // Auto-clear after 3 seconds
  }
}
