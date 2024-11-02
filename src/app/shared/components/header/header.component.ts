import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { CommonModule } from '@angular/common';
import { FarmerService } from '../../../profile/services/farmer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private farmerService: FarmerService
  ) {}

  @Output() menuClicked = new EventEmitter<void>();
  userName: string = 'Usuario';
  userId!: number;
  userImage!: string;

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.currentUserId.subscribe((userId) => {
          this.userId = userId;
          this.loadFarmerDetails(userId);
        
      })
    );
  }

  loadFarmerDetails(userId: number): void {
    this.subscriptions.add(
      this.farmerService.getById(userId).subscribe((farmer) => {
        this.userName = farmer.username;
        this.userImage = farmer.imageUrl ?? 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleSidebar() {
    this.menuClicked.emit();
  }

  onNotificationsClick() {}

  onSettingsClick() {}

  onProfileClick() {}
}