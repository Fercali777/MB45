import { Request } from 'express';
import { File } from 'multer';

// Extiende el tipo Request de Express para incluir la propiedad 'file'
declare global {
  namespace Express {
    interface Request {
      file?: File;
    }
  }
}