class Cliente {
  public nome: string;
  public dataNascimento: string;
  public celular: string;
  public email: string;
  public cpf: string;
}

class ClienteResponse {
  status: boolean;
  msg: string;
}

export { Cliente, ClienteResponse };
