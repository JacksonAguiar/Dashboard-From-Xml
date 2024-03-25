export interface SubscriberBillingData {
  quantidadeCobrancas: number;
  cobradaACadaXDias: number;
  dataInicio: Date;
  status: string;
  dataStatus: Date;
  dataCancelamento?: Date;
  valor: number;
  proximoCiclo: Date;
  idAssinante: string;
}
