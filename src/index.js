const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes");
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(router);

app.listen(PORT, console.log(PORT));
