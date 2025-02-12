// src/interfaces/controllers/UserController.ts
import { Request, Response } from "express";
import GetUser from "../application/GetUser"

export default class UserController {
  static async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const getUser = new GetUser();
    const user = getUser.execute(id);
    res.json(user);
  }
}
