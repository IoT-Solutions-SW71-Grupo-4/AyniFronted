import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { CommonModule } from '@angular/common';
import { FarmerService } from '../../../profile/services/farmer.service';
import { Subscription } from 'rxjs';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
 

  @Output() menuClicked = new EventEmitter<void>();
  userName: string = 'Usuario';
  userId!: number;
  userImage?: string;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public userState: UserStateService,
  ) {}



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