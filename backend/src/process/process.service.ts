import { Injectable } from '@nestjs/common';

import {
  GetLastFileUploaded,
  ConvertSheetToObj,
  BillingAnalytics,
} from '../utils';

import { SubscriberBillingData } from './types/interfaces';

@Injectable()
export class ProcessService {
  generateMetrics(data: SubscriberBillingData[]) {
    const metrics = new BillingAnalytics(data);

    const mrr = metrics.calculateMRRByMonth();
    const churn = metrics.calculateChurnRateByMonth();

    const renewalRate = metrics.calculateRenueRate(new Date());
    const ltv = metrics.calculateLTV();
    const futureIncome = metrics.calculateFutureIncome(3);

    return {
      mrr: Array.from(mrr, ([period, value]) => ({ period, value })),
      churn: Array.from(churn, ([period, value]) => ({ period, value })),
      renewalRate,
      ltv,
      futureIncome,
    };
  }

  async readFile(): Promise<any> {
    try {
      const file = await GetLastFileUploaded();

      const data = ConvertSheetToObj(file.filePath);

      const metrics = this.generateMetrics(data);
      return { ...metrics, latest: file.latestFileName };
    } catch (error) {
      // console.log(error);
    }

    return null;
  }
}
