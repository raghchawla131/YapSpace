import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import yapRoutes from "./routes/yap";
import searchRoutes from "./routes/search";
import followRoutes from "./routes/follow";
import likeRoutes from "./routes/like";
import commentRoutes from "./routes/comment";
import repostRoutes from "./routes/repost";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/yap", yapRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/repost", repostRoutes);

app.listen(8001, () => {
  console.log("Server is running on port 8001");
})