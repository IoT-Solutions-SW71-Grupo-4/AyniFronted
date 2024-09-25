import { Component } from '@angular/core';
import {LegendPosition} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-cicular-graph',
  templateUrl: './cicular-graph.component.html',
  styleUrls: ['./cicular-graph.component.css']
})
export class CicularGraphComponent {
  single2=[
    {
      "name": "Connected",
      "value": 4,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "Disconnected",
      "value": 2,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "Whit Fault",
      "value": 1,
      "extra": {
        "code": "fr"
      }
    }
  ];
  single = [
    {
      "name": "Phosphorus",
      "value": 50
    },
    {
      "name": "Nitrogen",
      "value": 13
    },
    {
      "name": "Potassium",
      "value": 10
    },
    {
      "name": "Other",
      "value": 27
    }
  ];
  view: [number,number] = [700, 300];

  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  onSelect2(event:any) {
    console.log(event);
  }
}
