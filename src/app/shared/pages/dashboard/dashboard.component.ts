import {Component, OnInit} from '@angular/core';
import {WeatherApiService} from "../../../crop/services/weather-api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private weatherService: WeatherApiService) {
  }

  ngOnInit(): void {
    console.log('here: ');
    this.weatherService.getWeather('us.33109','current').subscribe((response: any) => {
      console.log('here: ');
      console.log(response);
    });
  }
}
