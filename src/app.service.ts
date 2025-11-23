import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { IAssinatura } from './models';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  async getActivePlans() {
    const baseUrl = process.env.API_GATEWAY_BASE_URL || '';

    return await lastValueFrom(
      this.http.get<IAssinatura[]>(`${baseUrl}/planos/ativos`),
    );
  }
}
