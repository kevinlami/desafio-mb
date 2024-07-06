function isRequired(field) {
  return !(field && Boolean(field.trim()));
}

const validationForm = async (req, res, next) => {
  try {
    console.log(req.body);
    const requestData = req.body;
    const { documentType, mail, name, document, birthDate, phone, password } =
      requestData;

    Object.keys(requestData).forEach((field) => {
      if (isRequired(requestData[field])) {
        return res.status(400).json({
          status: "error",
          message: `Review your fields!`,
        });
      }
    });

    //dev:implement = validation
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "A problem occurred, please try again. Erro: " + error,
    });
  }
};

module.exports = { validationForm };
