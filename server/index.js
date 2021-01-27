const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const config = require("./config/key");
const whitelist = ["https://ppgram.herokuapp.com", "http://localhost:3000"];

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: whitelist,
    credentials: true
  })
);

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/post", require("./routes/post"));
app.use("/api/follow", require("./routes/follow"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/like", require("./routes/like"));
app.use("/api/scrap", require("./routes/scrap"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running.. ${port}`);
});
