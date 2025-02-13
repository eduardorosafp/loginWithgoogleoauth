// src/application/LoginUser.ts
import User from "../domain/User";
import UserRepository from "../domain/repositories/UserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class LoginUser {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.password) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, "secreto", { expiresIn: "1h" });
    return token;
  }
}
