const app = require("express")();
const bodyParser = require("body-parser");
const request = require("request");
//const hbs = require("hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", { result: "" });
});

app.post("/", (req, res) => {
  console.log(req.body.userId);
  var options = {
    url: `https://api.github.com/users/${req.body.userId}/repos`,
    headers: {
      "User-Agent": "request"
    }
  };

  request(options, (err, response) => {
    const result = JSON.parse(response.body);
    res.render("home", { result: result });
  });
});

app.listen(8000, () => {
  console.log("Server run on 8000");
});
