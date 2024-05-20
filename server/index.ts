import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth"

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoutes)

app.listen(8000, () => {
  console.log("Server is running on port 8000");
})