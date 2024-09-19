import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.css']
})
export class CropComponent implements OnInit {
  crops = [ {id: 1, name: 'Cotton',description:"descripcion 1", image: 'assets/images/img_1.png',price: 100,quantity: 10},
    {id: 2, name: 'Corn',description:"descripcion 2", image: 'assets/images/img.png',price: 200,quantity: 20},
    {id: 3, name: 'Soybean',description:"descripcion 3", image: 'assets/images/img_1.png',price: 300,quantity: 30},]

  constructor() {
  }
  ngOnInit(): void {
  }
}
