const express = require("express");
const path = require("path");
require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
});

app.use("/users", require("./routes/users"));

app.use(errorHandler);

app.listen(port, () =>
  console.log(`App listening: http://localhost:${port}`.underline.bgCyan)
);
