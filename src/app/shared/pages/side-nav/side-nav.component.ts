import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  shouldRun = true;

  constructor(private router:Router) {
  }

  ngOnInit(): void {
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
