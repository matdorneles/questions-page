import express from "express";
import bodyParser from "body-parser";
import { db } from "./database/database.js";
import { question } from "./database/models/question.js";

db.authenticate()
  .then(() => {
    console.log("Database connected")
  })
  .catch((errorMsg) => {
    console(errorMsg);
  })

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ROUTES
app.get("/", (req, res) => {
  question.findAll({ raw: true, order: [['id', 'ASC']] }).then(questions => {
    res.render("index", {
      questions: questions
    });
  });
});

app.get("/ask", (req, res) => {
  res.render("perguntar");
});

app.post("/ask/send", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  question.create({
    title: title,
    description: description
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/question/:id", (req, res) => {
  const id = req.params.id;
  question.findOne({
    where: {id: id}
  }).then(question => {
    if(question != undefined) {
      res.render("question", {
        question: question
      });
    } else {
      res.redirect("/");
    }
  });
});

app.listen(8080, () => {console.log("Server is online")});