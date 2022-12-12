import { goods } from "../Data/Goods";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };

    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;

    if (updatedItem.quantity == updatedItem.max_to_buy) {
      //alert("You have reached your maximum quantity of this item");
      //console.log("You cannot add anyth of this");
      updatedItem.disabled = true;
    }
  }
  //console.log("adding product", updatedCart);
  return {
    ...state,
    cart: updatedCart.sort(function (a, b) {
      if (a.id !== b.id) {
        return a.id - b.id;
      }
      if (a.name === b.name) {
        return 0;
      }
      return a.name > b.name ? 1 : -1;
    }),
  };
};

const removeProductFromCart = (productId, state) => {
  //console.log("remove product: " + productId);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
    if (updatedItem.quantity !== updatedItem.max_to_buy) {
      updatedItem.disabled = false;
    }
  }

  //console.log("remove product: " + updatedCart);
  return {
    ...state,
    cart: updatedCart.sort(function (a, b) {
      if (a.id !== b.id) {
        return a.id - b.id;
      }
      if (a.name === b.name) {
        return 0;
      }
      return a.name > b.name ? 1 : -1;
    }),
  };
};

export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);

    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);

    default:
      return state;
  }
};
