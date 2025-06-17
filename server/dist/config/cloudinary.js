"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const multer_storage_cloudinary_1 = __importDefault(require("multer-storage-cloudinary"));
// Configurar Cloudinary con .env
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Configurar almacenamiento para multer con Cloudinary
const storage = (0, multer_storage_cloudinary_1.default)({
    cloudinary: cloudinary_1.default.v2,
    params: async (req, file) => ({
        // Puedes definir dinámicamente 'folder' o 'public_id' aquí si lo deseas
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    }),
});
exports.storage = storage;
// Filtro para restringir tipos de archivo (jpg, png, jpeg)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Formato de imagen no válido. Solo se permite JPG, JPEG y PNG.'), false);
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.upload = upload;
