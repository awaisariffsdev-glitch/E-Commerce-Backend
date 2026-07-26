const express = require("express");
const connectDb = require("./config/connectDb");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(morgan("dev"));


app.use("/user",require("./routes/User"));
// app.use("/admin",require("./routes/Admin"));
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Is Live on http://localhost:${PORT}`);
    connectDb();
})