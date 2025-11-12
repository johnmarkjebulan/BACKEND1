import express from "express";
import "dotenv/config.js";
import bookRoutes from "./routers/BookRoutes.js";
import studentRoutes from "./routers/StudentRoutes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = { origin: process.env.ORIGIN };

app.use(express.json());
app.use(cors(corsOptions));
command:gitlens.showHomeView
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/book", bookRoutes);
app.use("/tbl_student", studentRoutes);

// app.use("/user", userRoutes); // remove this if file doesn't exist

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}...`);
});
