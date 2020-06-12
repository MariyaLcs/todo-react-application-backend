"use strict";

const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", function (req, res) {
  const listTasks = [
    {
      text: "Task1",
      completed: false,
      createdDate: "2020-05-05",
      id: 1,
    },
    {
      text: "Task2",
      completed: false,
      createdDate: "2020-05-05",
      id: 2,
    },
    {
      text: "Task3",
      completed: false,
      createdDate: "2020-05-05",
      id: 3,
    },
  ];
  res.send({ listTasks });
});

app.post("/tasks", function (req, res) {
  const text = req.body.text;
  const date = req.body.createdDate;
  res.status(201).json({
    message: `Received a request to add task: ${text}, with date: ${date}`,
  });
});

app.delete("/tasks/:taskId", function (req, res) {
  const id = req.params.taskId;
  let someResponse = {
    message: `You issued a delete request for ID: ${id}`,
  };
  if (id > 3) {
    res.status(404);
    someResponse = {
      message: `Task ${id} does not exist`,
    };
  }
  res.json(someResponse);
});

app.put("/tasks/:taskId", function (req, res) {
  const taskIdToAmmend = req.params.taskId;
  let putResponse = {
    message: `You issued a Put request for ID: ${taskIdToAmmend}`,
  };
  res.send(putResponse);
});

module.exports.handler = serverless(app);
