// src/interfaces/controllers/RegisterController.ts
import { Request, Response } from "express";
import RegisterUser from "../../application/RegisterUser";
import UserRepositoryMemory from "../../infrastructure/repositories/UserRepositoryMemory";

export default class RegisterController {
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userRepository = new UserRepositoryMemory();
    const registerUser = new RegisterUser(userRepository);

    try {
      const user = await registerUser.execute(name, email, password);
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
