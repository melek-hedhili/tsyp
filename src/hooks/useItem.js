import React, { createContext, useContext, useState, useReducer } from "react";
import { ADD_PRODUCT, REMOVE_PRODUCT, shopReducer } from "./reducers";

const ItemContext = createContext();
export const ItemProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(shopReducer, { cart: [] });
  const addProductToCart = (product) => {
    dispatch({ type: ADD_PRODUCT, product: product });
  };

  const removeProductFromCart = (productId) => {
    dispatch({ type: REMOVE_PRODUCT, productId: productId });
  };

  return (
    <ItemContext.Provider
      value={{
        cart: cartState.cart,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default function useItem() {
  return useContext(ItemContext);
}
