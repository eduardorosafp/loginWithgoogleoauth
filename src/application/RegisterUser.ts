// src/application/RegisterUser.ts
import User from "../domain/User";
import UserRepository from "../domain/repositories/UserRepository";
import bcrypt from "bcryptjs";

export default class RegisterUser {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(Date.now(), name, email, hashedPassword);

    await this.userRepository.save(user);
    return user;
  }
}
