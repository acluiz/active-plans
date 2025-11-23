export interface IPagamento {
  codAss: number;
  dataPagamento: string;
  valorPago: number;
}
export interface IAssinatura {
  codigo: number;
  codPlano: number;
  codCli: number;
  inicioFidelidade: string;
  fimFidelidade: string;
  dataUltimoPagamento: string;
  custoFinal: number;
  descricao: string;
}
