import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AyniFrontend';
  user = {
    name: 'Juan Pérez',
    photo: 'assets/images/user.jpg' 
  };

  currentSection = 'Dashboard';
}

