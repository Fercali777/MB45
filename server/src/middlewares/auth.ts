import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const isAuth: RequestHandler = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token, autorización denegada' });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      if (typeof decoded === 'object' && 'id' in decoded) {
        (req as AuthenticatedRequest).userId = decoded.id;
        next();
      } else {
        res.status(401).json({ message: 'Token inválido' });
      }
    } catch (err) {
      res.status(401).json({ message: 'Token no válido' });
    }
  }
};


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
