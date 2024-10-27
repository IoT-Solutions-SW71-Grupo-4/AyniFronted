import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Crop } from '../model/crop';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CropService extends BaseService<Crop> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/crops';
  }
}
