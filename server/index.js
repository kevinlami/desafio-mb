const { validationForm } = require("./validation.js");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/registration", express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  res.redirect("/registration");
});

app.get("/registration/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.post("/registration", validationForm, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Registro feito com sucesso!",
  });
});

app.listen(PORT, () => {
  console.log(`Server on -> http://localhost:${PORT}`);
});
