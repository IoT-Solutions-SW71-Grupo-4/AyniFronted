import {Component, Input} from '@angular/core';
import {Crop} from "../../model/crop";

@Component({
  selector: 'app-card-crop',
  templateUrl: './card-crop.component.html',
  styleUrls: ['./card-crop.component.css']
})
export class CardCropComponent {
  @Input() crops: Array<Crop>=[];

}
