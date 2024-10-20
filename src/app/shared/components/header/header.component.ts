import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../iam/services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isSidebarOpen = false;
  constructor(private authService: AuthenticationService, private router: Router) {}
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
 
}
