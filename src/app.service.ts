import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { lastValueFrom } from 'rxjs';

import { isActiveSubscription } from './utils';

import type { IAssinatura } from './models';

@Injectable()
export class AppService {
  constructor(
    private http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getActiveSubscriptionsFromCache() {
    const subscriptions =
      ((await this.cacheManager.get(
        'active_subscriptions',
      )) as IAssinatura[]) || [];

    return subscriptions;
  }

  async clearPlansFromCache() {
    await this.cacheManager.del('active_subscriptions');
  }

  async getActivePlans() {
    const subscriptionsFromCache = await this.getActiveSubscriptionsFromCache();

    if (subscriptionsFromCache.length > 0) {
      return subscriptionsFromCache;
    }

    const baseUrl = process.env.API_GATEWAY_BASE_URL || '';

    const response = await lastValueFrom(
      this.http.get<IAssinatura[]>(`${baseUrl}/planos/ativos`),
    );

    const subscriptions = response.data;

    const activeSubscriptions = subscriptions.filter((s) => {
      return isActiveSubscription(s.dataUltimoPagamento);
    });

    await this.cacheManager.set('active_subscriptions', activeSubscriptions);

    return activeSubscriptions;
  }
}
