import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const createAdminUser = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      return;
    }

    // Crear usuario admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = new User({
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

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  createAdminUser();
}

export { createAdminUser }; 