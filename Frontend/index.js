const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const BACKEND_URL = "http://backend:5000"; // docker-compose service name

app.post("/submit-score", async (req, res) => {
  const { score } = req.body;
  const response = await axios.post(`${BACKEND_URL}/grade`, { score });
  res.send(`Grade: ${response.data.grade}`);
});

app.post("/add-student", async (req, res) => {
  const { name, grade } = req.body;
  await axios.post(`${BACKEND_URL}/student`, { name, grade });
  res.send(`Student ${name} added/updated with grade ${grade}`);
});

app.get("/students", async (req, res) => {
  const response = await axios.get(`${BACKEND_URL}/students`);
  res.send(response.data);
});

app.post("/write-file", async (req, res) => {
  await axios.post(`${BACKEND_URL}/file/write`, { content: "Hello, this is file content." });
  res.send("Written to file");
});

app.get("/read-file", async (req, res) => {
  const response = await axios.get(`${BACKEND_URL}/file/read`);
  res.send(response.data.content);
});

app.listen(3000, () => console.log("Frontend running on port 3000"));
