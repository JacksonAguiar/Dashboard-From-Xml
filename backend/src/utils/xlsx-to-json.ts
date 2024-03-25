import { SubscriberBillingData } from 'src/process/types/interfaces';
import * as XLSX from 'xlsx';

export function ConvertSheetToJson(path: string) {
  const workbook = XLSX.readFile(path);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

  return data;
}
export function ConvertSheetToObj(path: string) {
  const data = ConvertSheetToJson(path);
  return convertArrayToSubscriberBillingData(data);
}

function excelDateToJSDate(serial: number): Date {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const fractional_day = serial - Math.floor(serial) + 0.0000001;
  let total_seconds = Math.floor(86400 * fractional_day);

  const seconds = total_seconds % 60;
  total_seconds -= seconds;

  const hours = Math.floor(total_seconds / (60 * 60));
  const minutes = Math.floor(total_seconds / 60) % 60;

  date_info.setHours(hours, minutes, seconds);

  return new Date(date_info);
}

function convertArrayToSubscriberBillingData(
  input: any[],
): SubscriberBillingData[] {
  return input.map((item) => ({
    quantidadeCobrancas: item['quantidade cobranças'],
    cobradaACadaXDias: item['cobrada a cada X dias'],
    dataInicio: excelDateToJSDate(item['data início']),
    status: item.status,
    dataStatus: excelDateToJSDate(item['data status']),
    dataCancelamento: item['data cancelamento']
      ? excelDateToJSDate(item['data cancelamento'])
      : null,
    valor: item.valor,
    proximoCiclo: excelDateToJSDate(item['próximo ciclo']),
    idAssinante: item['ID assinante'],
  }));
}
