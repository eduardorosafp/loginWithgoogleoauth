// src/application/GetUser.ts
import User from "../domain/User";

export default class GetUser {
  execute(id: string): User {
    const user = new User(34234234, 'John Doe', 'john@example.com');
    return user;
  }
}
