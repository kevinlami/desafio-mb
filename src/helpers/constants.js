export const FIELDS_NAME = {
  mail: "Endereço de e-mail",
  password: "Senha",
  cpf: {
    name: "Nome",
    document: "CPF",
    birthDate: "Data de nascimento",
    phone: "Telefone",
  },
  cnpj: {
    name: "Razão social",
    document: "CNPJ",
    birthDate: "Data de abertura",
    phone: "Telefone",
  },
};

export const FORM_TITLE = {
  entity: "Seja bem vindo(a)",
  cpf: "Pessoa Física",
  cnpj: "Pessoa jurídica",
  password: "Senha de acesso",
  review: "Revise suas informações",
};

export const ERRORS_MESSAGE = {
  required: "Campo obrigatório",
  email: "E-mail inválido",
  cpf: "CPF inválido",
  cnpj: "CNPJ inválido",
  password: "Senha deve contar texto, número e carácter especial",
  passwordLenght: "Senha deve conter pelo menos 8 caracteres",
  birthDate: "Data inválida",
  phone: "Telefone inválido",
};

export const INVALID_CNPJS = [
  "00000000000000",
  "11111111111111",
  "22222222222222",
  "33333333333333",
  "44444444444444",
  "55555555555555",
  "66666666666666",
  "77777777777777",
  "88888888888888",
  "99999999999999",
];
