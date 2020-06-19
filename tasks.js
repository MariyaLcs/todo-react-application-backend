const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "tr-todos-3.ckdfhksh7ic7.eu-west-1.rds.amazonaws.com",
  user: "admin",
  password: "!QAZ2wsx4",
  database: "todos",
});

app.get("/tasks", function (req, res) {
  const query = "SELECT * FROM tasks;";
  connection.query(query, function (err, data) {
    if (err) {
      console.log("Error fetching tasks", err);
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json({
        tasks: data,
      });
    }
  });
});

// {
//   "user_id": 2,
//   "text": "water the cacti",
//   "completed": false,
//   "deleted": false,
//   "date": "2019-10-12"
// }

app.post("/tasks", function (req, res) {
  const query =
    "INSERT INTO tasks (user_id, text, completed, deleted, date) VALUES (?, ?, ?, ?, ?);";
  connection.query(
    query,
    [
      req.body.user_id,
      req.body.text,
      req.body.completed,
      req.body.deleted,
      req.body.date,
    ],
    function (error, data) {
      if (error) {
        console.log("Error adding a task", error);
        res.status(500).json({
          error: error,
        });
      } else {
        res.status(201).json({
          data: data,
        });
      }
    }
  );
});

app.delete("/tasks/:task_id", function (req, res) {
  const deleteQuery = "DELETE FROM tasks WHERE task_id=?";
  connection.query(deleteQuery, [req.params.task_id], function (error, data) {
    if (error) {
      console.log("Error deleting a task", error);
      res.status(500).json({
        error: error,
      });
    } else {
      res.status(200).send(data);
    }
  });
});

// {
//   "user_id": 2,
//   "text": "water something else",
//   "completed": false,
//   "deleted": false,
//   "date": "2019-10-12"
// }

app.put("/tasks/:task_id", function (req, res) {
  const updateQuery =
    "UPDATE tasks SET text=?, deleted=?, completed=?, date=? WHERE task_id=?";
  connection.query(
    updateQuery,
    [
      req.body.text,
      req.body.deleted,
      req.body.completed,
      req.body.date,
      req.params.task_id,
    ],
    function (error, data) {
      if (error) {
        console.log("Error updating a task", error);
        res.status(500).json({
          error: error,
        });
      } else {
        res.sendStatus(200);
      }
    }
  );
});

module.exports.handler = serverless(app);
