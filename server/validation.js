const validationForm = async (req, res, next) => {
  try {
    //dev:implement = validation
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "A problem occurred, please try again.",
    });
  }
};

module.exports = { validationForm };
