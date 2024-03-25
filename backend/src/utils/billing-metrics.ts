import { SubscriberBillingData } from 'src/process/types/interfaces';

export default class BillingAnalytics {
  private data: SubscriberBillingData[];

  constructor(data: SubscriberBillingData[]) {
    this.data = data;
  }

  calculateMRRByMonth(): Map<string, number> {
    const mrrByMonth: Map<string, number> = new Map();

    this.data.forEach((item) => {
      const monthKey =
        item.dataInicio.getMonth() + 1 + '/' + item.dataInicio.getFullYear();

      if (item.status === 'Ativa') {
        if (!mrrByMonth.has(monthKey)) {
          mrrByMonth.set(monthKey, 0);
        }
        mrrByMonth.set(monthKey, mrrByMonth.get(monthKey)! + item.valor);
      }
    });

    return this.sortByMonth(mrrByMonth);
  }

  calculateFutureIncome(mesesPrevisao: number): number {
    const churnRateMensal = 0.05;

    let receitaMensalAtual = this.data.reduce(
      (acc, subscriber) => acc + subscriber.valor,
      0,
    );

    let receitaFutura = 0;
    for (let mes = 1; mes <= mesesPrevisao; mes++) {
      receitaFutura += receitaMensalAtual;
      receitaMensalAtual *= 1 - churnRateMensal;
    }

    return receitaFutura;
  }

  calculateLTV() {
    const totalRevenue = this.data.reduce(
      (acc, subscriber) => acc + subscriber.valor,
      0,
    );
    const totalCustomers = this.data.length;
    return totalRevenue / totalCustomers;
  }

  calculateRenueRate(dataReferencia: Date): string {
    const subscriptionsEnabledForRenewal = this.data.filter((subscriber) => {
      const proximoCiclo = new Date(subscriber.proximoCiclo);
      return proximoCiclo <= dataReferencia;
    });

    const subscriptionsRenewed = subscriptionsEnabledForRenewal.filter(
      (subscriber) => subscriber.status === 'Ativa',
    );

    const renewalRate =
      (subscriptionsRenewed.length / subscriptionsEnabledForRenewal.length) *
      100;

    return `${renewalRate.toFixed(2)}%`;
  }

  calculateChurnRateByMonth(): Map<string, number> {
    const churnRateByMonth: Map<string, number> = new Map();

    this.data.forEach((item) => {
      const monthKey = item.dataCancelamento
        ? item.dataCancelamento.getMonth() +
          1 +
          '/' +
          item.dataCancelamento.getFullYear()
        : '';

      if (item.status.trim() === 'Cancelada') {
        if (!churnRateByMonth.has(monthKey)) {
          churnRateByMonth.set(monthKey, 0);
        }
        churnRateByMonth.set(monthKey, churnRateByMonth.get(monthKey)! + 1);
      }
    });

    return this.sortByMonth(churnRateByMonth);
  }

  private sortByMonth(data: Map<string, number>): Map<string, number> {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const parsePeriod = (period: string): Date => {
      const [month, year] = period.split('/');
      return new Date(Number(year), Number(month) - 1);
    };

    const dataArray: [string, number][] = Array.from(data.entries());

    const sortedArray = dataArray.sort(
      ([keyA], [keyB]) =>
        parsePeriod(keyA).getTime() - parsePeriod(keyB).getTime(),
    );

    const convertedData = sortedArray.map(([period, value]) => {
      const [month, year] = period.split('/');
      const monthName = months[parseInt(month, 10) - 1];
      return { period: `${monthName}/${year}`, value };
    });

    // Create a Map from the converted data
    const sortedMap = new Map(
      convertedData.map(({ period, value }) => [period, value]),
    );

    // const sortedMap = new Map(convertedData);

    return sortedMap;
  }
}
