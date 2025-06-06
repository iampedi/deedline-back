// src/routes/content.routes.ts
import { Router } from "express";
import {
  createContent,
  deleteContent,
  getAllContents,
  getContent,
  updateContent,
} from "@/controllers/content.controller";

const router = Router();

// POST: /api/contents
router.post("/", createContent);

// GET: /api/contents
router.get("/", getAllContents);

// GET: /api/contents/:id
router.get("/:id", getContent);

// PUT: /api/contents/:id
router.put("/:id", updateContent);

// DELETE: /api/contents/:id
router.delete("/:id", deleteContent);

export default router;
