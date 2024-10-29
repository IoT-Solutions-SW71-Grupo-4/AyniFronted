import { Injectable } from '@angular/core';
import { Device } from '../models/device';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DeviceService extends BaseService<Device> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/devices';
  }
}
