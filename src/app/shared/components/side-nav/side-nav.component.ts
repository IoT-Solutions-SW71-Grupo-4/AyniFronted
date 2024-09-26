import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  shouldRun = true;
  menuItems = [
    { name: 'Dashboard', icon: 'home', route: 'dashboard' },
    { name: 'Devices', icon: 'people', route: 'devices' },
    { name: 'Irrigation', icon: 'settings', route: 'irrigation' },
    { name: 'Soil Analysis', route: '/soil-analysis', icon: 'nature' },
    { name: 'Report', route: '/report', icon: 'assessment' }, 
  ];
  activeItem = this.menuItems[0];
  constructor(private router:Router) {
  }

  ngOnInit(): void {
  }

  setActiveItem(item: any) {
    this.activeItem = item;
  }
  Navigate(name: string) {
    if (name === 'Dashboard') {
      this.navigateDashboard();
    } else if (name === 'Devices') {
      this.navigateDevices();
    } else if (name === 'Irrigation') {
      this.navigateIrrigation();
    }
  }
  navigateDashboard() {
    this.router.navigate(['dashboard']);
  }

  navigateDevices() {
    this.router.navigate(['devices']);
  }

  navigateIrrigation() {
    this.router.navigate(['irrigation']);
  }

}
