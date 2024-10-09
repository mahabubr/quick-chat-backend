import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupController {
  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.user;

      const group = await prisma.chatGroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          user_id: user.id,
        },
      });

      return res.status(200).json({
        message: "Chat Group Created Successfully",
        data: group,
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const user = req.user;

      const group = await prisma.chatGroup.findMany({
        where: { user_id: user.id },
        orderBy: {
          created_at: "desc",
        },
      });

      return res.status(200).json({
        message: "Chat Groups Fetched Successfully",
        data: group,
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const group = await prisma.chatGroup.findUnique({
        where: { id },
      });

      return res.status(200).json({
        message: "Chat Group Fetched Successfully",
        data: group,
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;

      const group = await prisma.chatGroup.update({
        where: { id },
        data: {
          title: body.title,
          passcode: body.passcode,
        },
      });

      return res.status(200).json({
        message: "Chat Groups Updated Successfully",
        data: group,
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const group = await prisma.chatGroup.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "Chat Group Deleted Successfully",
        data: group,
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export default ChatGroupController;
