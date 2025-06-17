"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token, autorización denegada' });
    }
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (typeof decoded === 'object' && 'id' in decoded) {
                req.userId = decoded.id;
                next();
            }
            else {
                res.status(401).json({ message: 'Token inválido' });
            }
        }
        catch (err) {
            res.status(401).json({ message: 'Token no válido' });
        }
    }
};
exports.isAuth = isAuth;
// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// interface AuthenticatedRequest extends Request {
//   user?: JwtPayload | string;
// }
// export const isAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) {
//     res.status(401).json({ message: 'No token, autorización denegada' });
//     return;
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     req.user = decoded;
//     next(); // ✔️ importante: continuar con la cadena de middlewares
//   } catch (err) {
//     res.status(401).json({ message: 'Token no válido' });
//   }
// };
