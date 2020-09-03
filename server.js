const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const expressJwt = require("express-jwt");
require("dotenv").config();

app.use(express.json());
app.use(morgan("dev"));

mongoose.connect(
    "mongodb://localhost:27017/hustl",
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Connected to MongoDB");
    }
);

app.use("/auth", require("./routes/authRouter.js"));
app.use(
    "/api",
    expressJwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);
app.use("/api/projects", require("./routes/projectRouter.js"));
app.use("/api/task", require("./routes/taskRouter.js"));

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(err.status);
    }
    return res.send({ errMsg: err.message });
});

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
});
