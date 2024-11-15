import { Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FarmerService } from '../../profile/services/farmer.service';
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService{

  readonly userName = signal<string>('Usuario');
  readonly userImage = signal<string>(
    'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'
  );

  constructor(
    private farmerService: FarmerService
  ) {
    
  }


  loadUserData(userId: number): void {
    if (userId) {
      this.farmerService.getById(userId).subscribe((data) => {
        this.updateUser(
          data.username,
          data.imageUrl || 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'
        );
      });
    }
  }

  updateUser(name: string, image: string): void {
    this.userName.set(name);
    this.userImage.set(image);
  }
}

