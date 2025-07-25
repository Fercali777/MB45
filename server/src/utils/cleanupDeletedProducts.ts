import mongoose from 'mongoose';
import { Product } from '../models/Product';

// Función para eliminar permanentemente productos que han estado marcados como eliminados por más de X días
export const permanentlyDeleteOldProducts = async (daysOld: number = 30) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const deletedProducts = await Product.find({
      isDeleted: true,
      deletedAt: { $lt: cutoffDate }
    });

    if (deletedProducts.length === 0) {
      console.log('No products to permanently delete');
      return;
    }

    const productIds = deletedProducts.map(product => product._id);
    
    // Eliminar permanentemente
    await Product.deleteMany({ _id: { $in: productIds } });

    console.log(`Permanently deleted ${deletedProducts.length} products that were soft deleted more than ${daysOld} days ago`);
  } catch (error) {
    console.error('Error permanently deleting old products:', error);
  }
};

// Función para obtener estadísticas de productos eliminados
export const getDeletedProductsStats = async () => {
  try {
    const totalDeleted = await Product.countDocuments({ isDeleted: true });
    const recentlyDeleted = await Product.countDocuments({
      isDeleted: true,
      deletedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Últimos 7 días
    });

    return {
      totalDeleted,
      recentlyDeleted,
      totalProducts: await Product.countDocuments()
    };
  } catch (error) {
    console.error('Error getting deleted products stats:', error);
    return null;
  }
}; 