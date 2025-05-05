import multer from 'multer';
import cloudinary from 'cloudinary';
import multerStorageCloudinary from 'multer-storage-cloudinary';



// Configurar Cloudinary con .env
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar almacenamiento para multer con Cloudinary
const storage = multerStorageCloudinary({
  cloudinary: cloudinary.v2,
  params: async (req, file) => ({
    // Puedes definir dinámicamente 'folder' o 'public_id' aquí si lo deseas
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  }),
});

// Filtro para restringir tipos de archivo (jpg, png, jpeg)
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de imagen no válido. Solo se permite JPG, JPEG y PNG.'), false);
  }
};

const upload = multer({ storage, fileFilter });

export { upload, storage };