import { Component } from '@angular/core';

@Component({
  selector: 'app-analyze-summary',
  templateUrl: './analyze-summary.component.html',
  styleUrls: ['./analyze-summary.component.css']
})
export class AnalyzeSummaryComponent {

  datas= [{
    number: "20°",
    image: 'assets/images/img_1.png',
    title: 'cloudy',
    status: 'Good'
  },{
    number: "50 %",
    image: 'assets/images/img_1.png',
    title: 'Soil Moisture',
    status: 'Good'
  },{
    number: "60°C",
    image: 'assets/images/img_1.png',
    title: 'Soil Temperature',
    status: 'Good'
  },{
    number: "7.6",
    image: 'assets/images/img_1.png',
    title: 'Ph Level',
    status: 'Good'
  }]
}
