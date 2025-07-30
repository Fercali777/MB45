"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const shoppingRoutes_1 = __importDefault(require("./routes/shoppingRoutes"));
const favoriteRoutes_1 = __importDefault(require("./routes/favoriteRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
// CORS para permitir conexión con frontend
app.use((0, cors_1.default)({
    origin: ['https://mb-45-mongo-db-rg2t.vercel.app', 'http://localhost:5173'],
    credentials: true,
}));
// Rutas
app.use('/api/auth', userRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/comments', commentRoutes_1.default);
app.use("/api/shopping", shoppingRoutes_1.default);
app.use("/api/favorites", favoriteRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Server Working');
});
// Conexión con MongoDB
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error('Error al conectar con MongoDB:', err);
});
