import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Analysis } from '../model/soil';

@Injectable({
  providedIn: 'root',
})
export class SoilService extends BaseService<Analysis> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/analysis';
  }
}
