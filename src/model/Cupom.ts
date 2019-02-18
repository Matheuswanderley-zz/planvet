class Cupom {
  public vendedor: string;
  public cpf: string;
  public cupom: string;
  public data: string;
  public codigoBarras: string;
  public imagem: any;
}

class CupomResponse {
  status: string;
  msg: string;
}

export { Cupom, CupomResponse };
