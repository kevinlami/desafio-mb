import {
  isRequired,
  isValidEmail,
  isValidCPF,
  isValidCNPJ,
  isValidDate,
  isValidPhoneNumber,
  isValidPassword,
  isValidMinLength,
} from "@/helpers/validation.js";
import {
  ERRORS_MESSAGE,
  FIELDS_NAME,
  FORM_TITLE,
} from "@/helpers/constants.js";

/*
The const FORMS_STRUCTURE is used to create the form dynamically.
FORMS_STRUCTURE is a list of functions that return an object. It was chosen to be a function because each function receives the data from the previous steps.

Structure of the object returned by the function:
{
      title: 'String: title of the form',
      formFields: [
        // formFields is a list of input configurations, each input has its own function.
        {
          type: 'String: type used in inputs types, e.g., text, radio, date, password...',
          id: 'String: unique ID',
          review: 'Boolean: This field is used to determine if the input will be added in the review',
          fieldTitle: 'String: Title of the input to be displayed',
          errors: [
            // errors is a list of validations for the input field, this list follows in increasing index order.
            {
              message: 'String: Error message to be displayed if the callback function is not satisfied',
              callback: 'Function: This function receives the field value, returning true if it is INVALID and false if it is VALID',
            }
          ],
          showError: 'String: This field should remain an empty string (""), it is used to display the error in the input',
          value: 'String: Default value of the input, if no value should be added leave it as an empty string ("")',
          options: [
            // options is a list used only for the type: "radio", with all options for each radio.
            {
              title: 'String: Title of the input to be displayed',
              value: 'String: input value',
            },
          ],
        },
      ],
    };
*/

export const FORMS_STRUCTURE = [
  (formSubmit) => {
    return {
      title: FORM_TITLE.entity,
      formFields: [
        {
          type: "text",
          id: "email",
          review: true,
          fieldTitle: FIELDS_NAME.mail,
          errors: [
            { message: ERRORS_MESSAGE.required, callback: isRequired },
            {
              message: ERRORS_MESSAGE.email,
              callback: isValidEmail,
            },
          ],
          showError: "",
          value: formSubmit.email,
        },
        {
          type: "radio",
          id: "documentType",
          review: false,
          options: [
            {
              title: "Pessoa física",
              value: "cpf",
            },
            {
              title: "Pessoa jurídica",
              value: "cnpj",
            },
          ],
          errors: [{ message: ERRORS_MESSAGE.required, callback: isRequired }],
          showError: "",
          value: formSubmit.documentType,
        },
      ],
    };
  },
  (formSubmit) => {
    let title = FORM_TITLE.cpf;
    let fieldsNameEntity = FIELDS_NAME.cpf;
    let errorMessageEntity = ERRORS_MESSAGE.cpf;
    let documentValidation = isValidCPF;

    if (formSubmit.documentType === "cnpj") {
      title = FORM_TITLE.cnpj;
      fieldsNameEntity = FIELDS_NAME.cnpj;
      errorMessageEntity = ERRORS_MESSAGE.cnpj;
      documentValidation = isValidCNPJ;
    }

    return {
      title: title,
      formFields: [
        {
          type: "text",
          id: "name",
          review: true,
          fieldTitle: fieldsNameEntity.name,
          errors: [{ message: ERRORS_MESSAGE.required, callback: isRequired }],
          showError: "",
          value: formSubmit.name,
        },
        {
          type: "text",
          id: "document",
          review: true,
          fieldTitle: fieldsNameEntity.document,
          errors: [
            { message: ERRORS_MESSAGE.required, callback: isRequired },
            { message: errorMessageEntity, callback: documentValidation },
          ],
          showError: "",
          value: formSubmit.document,
        },
        {
          type: "date",
          id: "birthDate",
          review: true,
          fieldTitle: fieldsNameEntity.birthDate,
          errors: [
            { message: ERRORS_MESSAGE.required, callback: isRequired },
            { message: ERRORS_MESSAGE.birthDate, callback: isValidDate },
          ],
          showError: "",
          value: formSubmit.birthDate,
        },
        {
          type: "text",
          id: "phone",
          review: true,
          fieldTitle: fieldsNameEntity.phone,
          errors: [
            { message: ERRORS_MESSAGE.required, callback: isRequired },
            { message: ERRORS_MESSAGE.phone, callback: isValidPhoneNumber },
          ],
          showError: "",
          value: formSubmit.phone,
        },
      ],
    };
  },
  (formSubmit) => {
    return {
      title: FORM_TITLE.password,
      formFields: [
        {
          id: "password",
          type: "password",
          review: true,
          fieldTitle: FIELDS_NAME.password,
          errors: [
            { message: ERRORS_MESSAGE.required, callback: isRequired },
            {
              message: ERRORS_MESSAGE.passwordLenght,
              callback: isValidMinLength,
            },
            { message: ERRORS_MESSAGE.password, callback: isValidPassword },
          ],
          showError: "",
          value: formSubmit.password,
        },
      ],
    };
  },
];
