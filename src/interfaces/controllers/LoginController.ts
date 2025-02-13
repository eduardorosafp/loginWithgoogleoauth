// src/interfaces/controllers/LoginController.ts
import { Request, Response } from "express";
import LoginUser from "../../application/LoginUser";
import UserRepositoryMemory from "../../infrastructure/repositories/UserRepositoryMemory";

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const userRepository = new UserRepositoryMemory();
    const loginUser = new LoginUser(userRepository);

    try {
      const token = await loginUser.execute(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json(error);
    }
  }
}
