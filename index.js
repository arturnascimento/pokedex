const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const pokedex = [];
let message = "";

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);

  res.render("index", {
    pokedex,
    message,
  });
});

app.get("/registro", (req, res) => {
  res.render("registro");
});

app.post("/new", (req, res) => {
  const pokemon = req.body;
  pokedex.push(pokemon);
  message = "O Pokemon foi criado!";
  res.redirect("/");
});

app.get("/details/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = pokedex[id];
  res.render("details", {
    pokemon,
  });
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);