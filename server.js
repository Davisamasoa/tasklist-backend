require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 3000;

const checkToken = require("./auth");

// Iniciando banco de dados
require("./database");

// Rotas
const registerRouter = require("./src/routes/register");
const loginRouter = require("./src/routes/login");
const tasksRouter = require("./src/routes/tasks");
const indexRouter = require("./src/routes/index");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/tasks", checkToken, tasksRouter);
app.use("/", indexRouter);

app.listen(
	port,
	(appListen = () => {
		console.log("Backend iniciado!");
	})
);
