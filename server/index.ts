import express from "express";
import authRoutes from "./routes/auth"

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes)

app.listen(8000, () => {
  console.log("Server is running on port 8000");
})