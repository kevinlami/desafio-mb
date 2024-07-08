function isRequired(field) {
  return !(field && Boolean(field.trim()));
}

const validationForm = async (req, res, next) => {
  try {
    const requestData = req.body;
    Object.keys(requestData).forEach((field) => {
      if (isRequired(requestData[field])) {
        return res.status(400).json({
          status: "error",
          message: `Revise seu cadastro`,
        });
      }
    });

    //dev:implement = validation
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Ouve um problema, por favor tente outra vez.",
    });
  }
};

module.exports = { validationForm };
