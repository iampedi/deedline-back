// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rootRoutes from "@/routes/root.routes";
import contentRoutes from "@/routes/content.routes";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/", rootRoutes);
app.use("/api/contents", contentRoutes);

export default app;
