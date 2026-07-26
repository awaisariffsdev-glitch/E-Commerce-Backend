const express = require("express");
const connectDb = require("./config/connectDb");
const morgan = require("morgan");
const User = require("./model/user.models");
const app = express();
const authMiddleware = require("./middleware/auth");
require("dotenv").config();
app.use(express.json());
app.use(morgan("dev"));

app.get("/profile", authMiddleware, async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        }

        const userFind = await User.find({ email });

        return res.status(200).json({
            message: "User Find Successfully",
            userFind
        })
    } catch (error) {
        console.log("Index Error", error);
    }
})
app.use("/user", require("./routes/User"));
// app.use("/admin",require("./routes/Admin"));
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Is Live on http://localhost:${PORT}`);
    connectDb();
})