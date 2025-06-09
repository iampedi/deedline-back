// src/controllers/content.controllers.ts
import { Request, Response } from "express";
import prisma from "@/db/prismaClient";
import { ContentType } from "@prisma/client";

// CREATE new content
export const createContent = async (req: Request, res: Response) => {
  try {
    const { title, type, link, tags, description } = req.body;

    const existing = await prisma.content.findUnique({
      where: {
        title_type: {
          title,
          type,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ error: "Content already exists." });
    }

    const content = await prisma.content.create({
      data: {
        title,
        type,
        link,
        tags,
        description,
      },
    });
    res.status(201).json(content);
  } catch (error: any) {
    console.log("🔴 Create Content Error‼️ ", error);
    res.status(500).json({ error: "Failed to create content." });
  }
};

// GET all contents
export const getAllContents = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;

    let where = undefined;

    if (type && Object.values(ContentType).includes(type as ContentType)) {
      where = { type: type as ContentType };
    }

    const contents = await prisma.content.findMany({ where });
    res.json(contents);
  } catch (error) {
    console.log("🔴 Get Contents Error‼️ ", error);
    res.status(500).json({ error: "Failed to fetch contents." });
  }
};

// GET a specific content
export const getContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const content = await prisma.content.findUnique({
      where: { id },
    });
    res.json(content);
  } catch (error) {
    console.log("🔴 Get Content Error‼️ ", error);
    res.status(500).json({ error: "Failed to fetch content." });
  }
};

// PUT: update a specific content
export const updateContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, type, link, tags, description } = req.body;

    if (title) {
      const existing = await prisma.content.findUnique({
        where: { title_type: { title, type } },
      });
      if (existing && existing.id !== id) {
        return res.status(400).json({ error: "Content already exists." });
      }
    }

    const dataToUpdate: any = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (type !== undefined) dataToUpdate.type = type;
    if (description !== undefined) dataToUpdate.description = description;
    if (link !== undefined) dataToUpdate.link = link;

    const content = await prisma.content.update({
      where: { id },
      data: dataToUpdate,
    });

    res.json(content);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Content not found." });
    }
    console.log("🔴 Update Content Error‼️ ", error);
    res.status(500).json({ error: "Failed to update content." });
  }
};

// DELETE: delete a specific content
export const deleteContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const content = await prisma.content.delete({
      where: { id },
    });
    res.json(content);
  } catch (error) {
    console.log("🔴 Delete Content Error‼️ ", error);
    res.status(500).json({ error: "Failed to delete content." });
  }
};
