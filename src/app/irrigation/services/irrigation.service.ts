import { Injectable } from '@angular/core';
import { Irrigation } from '../model/irrigation';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IrrigationService extends BaseService<Irrigation> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/irrigation';
  }
}
