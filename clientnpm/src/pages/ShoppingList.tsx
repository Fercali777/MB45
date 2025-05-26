import React from 'react';
import { ShoppingItemsList } from "../components/ShoppingItemsList";

const ShoppingList: React.FC = () => {
  return (

    <div className="container">
        <div className="row">
              <div className="col-lg-6 col-sm-12">
                
                <ShoppingItemsList />
              </div>
        </div>
    </div>
  );
};

export default ShoppingList;