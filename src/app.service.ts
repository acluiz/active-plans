import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { isActiveSubscription } from './utils';

import type { IAssinatura } from './models';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  async getActivePlans() {
    const baseUrl = process.env.API_GATEWAY_BASE_URL || '';

    const response = await lastValueFrom(
      this.http.get<IAssinatura[]>(`${baseUrl}/planos/ativos`),
    );

    const subscriptions = response.data;

    const activeSubscriptions = subscriptions.filter((s) => {
      return isActiveSubscription(s.dataUltimoPagamento);
    });

    return activeSubscriptions;
  }
}
