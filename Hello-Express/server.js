"use strict";

const express = require("express");

// DB

const app = express();
app.use(express.json());

// ROUTERS
app.use("/user", require("./routers/userRouter"));
app.use("/todo", require("./routers/todoRouter"));

app.listen(3000);
console.log("listening to port 3000");
