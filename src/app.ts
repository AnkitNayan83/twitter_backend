import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 5555;

app.use(express.json());

//routes
app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send("<h1>testing server</h1>");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
