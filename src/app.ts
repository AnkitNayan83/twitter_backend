import express from "express";
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
const port = 5000;

app.use(express.json());

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", tweetRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("*", (req, res) => {
    res.send("<h1>404 Not Found</h1>");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
