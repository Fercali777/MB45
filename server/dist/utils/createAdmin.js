"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createAdminUser = async () => {
    try {
        // Conectar a MongoDB
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        // Verificar si ya existe un admin
        const existingAdmin = await User_1.User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists:', existingAdmin.email);
            return;
        }
        // Crear usuario admin
        const hashedPassword = await bcryptjs_1.default.hash('admin123', 10);
        const adminUser = new User_1.User({
            name: 'Super Admin',
            email: 'admin@mb45.com',
            password: hashedPassword,
            phone: '123456789',
            address: 'Admin Address',
            city: 'Admin City',
            country: 'Admin Country',
            postCode: '12345',
            role: 'admin'
        });
        await adminUser.save();
        console.log('Admin user created successfully!');
        console.log('Email: admin@mb45.com');
        console.log('Password: admin123');
        console.log('Role: admin');
    }
    catch (error) {
        console.error('Error creating admin user:', error);
    }
    finally {
        await mongoose_1.default.disconnect();
        console.log('Disconnected from MongoDB');
    }
};
exports.createAdminUser = createAdminUser;
// Ejecutar si se llama directamente
if (require.main === module) {
    createAdminUser();
}
