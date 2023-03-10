const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

mongoose
	.connect(
		`mongodb+srv://${dbUser}:${dbPassword}@cluster0.okyfezv.mongodb.net/tasklist?retryWrites=true&w=majority`
	)
	.then(() => console.log("Conectado ao MongoDB"))
	.catch((error) => console.log(error));
