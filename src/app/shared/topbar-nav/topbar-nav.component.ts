// src/app/shared/top-bar/top-bar.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './topbar-nav.component.html',
  styleUrls: ['./topbar-nav.component.css']
})
export class TopBarComponent {
  user = {
    name: 'Juan Pérez',
    photo: 'assets/images/user.jpg'
  };
}
