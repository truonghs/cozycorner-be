// config server app
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// config port
const PORT = process.env.PORT || 5001;

// config cors
const cors = require("cors");
app.use(
  cors({
    origin: "https://cozycorner-woad.vercel.app",
    credentials: true, // cho phép gửi cookie
  })
);
app.use(cookieParser());
// Phân tích dữ liệu JSON
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// config .env
const dotenv = require("dotenv");
dotenv.config();

// config route
const route = require("./routes");
route(app);

// config database
const db = require("./configs/dbconfigs");
db.connect();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});
