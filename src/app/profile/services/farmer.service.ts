import { Injectable } from '@angular/core';
import { Farmer } from '../model/farmer';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FarmerService extends BaseService<Farmer> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/farmers';
  }

  updateFarmerImage(farmerId: number, imageFile: File): Observable<Farmer> {
    const formData = new FormData();
    formData.append('file', imageFile);
    return this.http.put<Farmer>(`${this.resourcePath()}/${farmerId}/farmerImage`, formData);
  }

  deleteFarmerImage(farmerId: number): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath()}/${farmerId}/farmerImage`, this.httpOptions);
  }
}
