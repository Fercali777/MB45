import React from 'react';
import { ShoppingItemsList } from "../components/ShoppingItemsList";

const ShoppingList: React.FC = () => {
  return (
    <div>
      <h1>Tu Carrito de Compras</h1>
      <ShoppingItemsList />
    </div>
  );
};

export default ShoppingList;