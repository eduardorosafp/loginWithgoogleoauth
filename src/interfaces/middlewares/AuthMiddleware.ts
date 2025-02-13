// src/interfaces/middlewares/AuthMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default class AuthMiddleware {
  static verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers["authorization"]?.split(" ")[1]; 

    if (!token) {
      res.status(401).json({ error: "Token not provided" });
      return; 
    }

    try {

      const decoded = jwt.verify(token, "secreto") as { userId: string };
      req.userId = decoded.userId; 
    } catch (error) { 
      res.status(401).json({ error: "Invalid token" });
      return; 
    }
  }
}
