const express = require("express");
const bodyParser = require("body-parser");
const { append } = require("express/lib/response");

const app = express();
const port = process.env.PORT || 4041;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = [{ id: "1", name: "Yannik", age: "17" }];

app.get("/", (_, res) => {
  res.send("Express App");
});

app.get("/users", (_, res) => {
  res.json({ ok: true, users });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.filter((user) => user.id === id)[0];
  res.json({ ok: true, user });
});

app.post("/adduser", (req, res) => {
  const { id, name, age } = req.body;
  if (id && name && age) {
    users.push({ id, name, age });
    res.json({ ok: true, users });
  }
});

app.listen(port, () => {
  console.log("server is running on port: ${port}");
});
