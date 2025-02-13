// src/types/express.d.ts
import { User } from "../domain/User";

declare global {
  namespace Express {
    interface Request {
      userId?: string; 
    }
  }
}
