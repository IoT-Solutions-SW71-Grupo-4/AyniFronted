import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  @Output() menuClicked = new EventEmitter<void>();
  userName: string = 'Usuario';
  userImage: string =
    'https://cdn.vitalfarms.com/wp-content/uploads/2023/12/Roh_VitalFarms_Aug23_269.jpg';

  toggleSidebar() {
    this.menuClicked.emit();
  }

  onNotificationsClick() {}

  onSettingsClick() {}

  onProfileClick() {}
}
