import { INVALID_CNPJS } from "@/helpers/constants.js";

export function isRequired(field) {
  return !(field && Boolean(field.trim()));
}

export const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    return false;
  } else if (!emailPattern.test(email)) {
    return false;
  }

  return true;
};

export const isValidCPF = (cpf) => {
  const cpfValue = cpf.replace(/[^\d]/g, "");

  if (cpfValue.length !== 11) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpfValue.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpfValue.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpfValue.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpfValue.substring(10, 11))) {
    return false;
  }

  return true;
};

export const isValidCNPJ = (cnpj) => {
  const cnpjValue = cnpj.replace(/[^\d]/g, "");

  if (cnpjValue.length !== 14) {
    return false;
  }

  if (INVALID_CNPJS.includes(cnpjValue)) {
    return false;
  }

  let length = cnpjValue.length - 2;
  let numbers = cnpjValue.substring(0, length);
  let digits = cnpjValue.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  length += 1;
  numbers = cnpjValue.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) {
    return false;
  }

  return true;
};

export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const year1900 = new Date("1900-01-01");

  if (isNaN(date.getTime())) {
    return false;
  }

  return date >= year1900 && date < today;
};

export const isValidPhoneNumber = (phone) => {
  const cleaned = phone.replace(/[^\d]/g, "");
  const isValid = /^(\d{10}|\d{11})$/.test(cleaned);

  return isValid;
};
