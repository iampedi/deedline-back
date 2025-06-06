// src/routes/root.routes.ts
import { Router } from "express";

const router = Router();

// GET: /
router.get(["/", ""], (_req, res) => {
  res.json({ message: "Welcome to Pickly. 🌱" });
});

router.get("/api", (_req, res) => {
  res.json({ message: "All is good here. 👋" });
});

export default router;
