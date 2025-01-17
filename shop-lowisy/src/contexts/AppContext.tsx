import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

// =================================================================================
type initialState = {
  cart: CartItem[];
};

export type CartItem = {
  qty: number;
  name: string;
  price: number;
  imgUrl?: string;
  id: string | number;
  restaurantId?: string;
};

type cartActionType = { type: "CHANGE_CART_AMOUNT"; payload: CartItem };
type ActionType = cartActionType;

// =================================================================================

const initialState = {
  cart: [
    // {
    //   price: 250,
    //   name: "Ford 2019",
    //   imgUrl: "/assets/images/products/Automotive/1.Ford2019.png",
    //   id: "7222243834583537",
    //   qty: 1,
    // },
    // {
    //   price: 250,
    //   name: "Porsche 2020",
    //   imgUrl: "/assets/images/products/Automotive/28.Porsche2020.png",
    //   id: "38553442244076086",
    //   qty: 1,
    // },
    // {
    //   price: 250,
    //   name: "Heavy 20kt Gold Necklace",
    //   imgUrl:
    //     "/assets/images/products/Fashion/Jewellery/9.Heavy20ktGoldNecklace.png",
    //   id: "9573201630529315",
    //   qty: 1,
    // },
  ],
};

interface ContextProps {
  state: initialState;
  dispatch: (args: ActionType) => void;
}

const AppContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => { },
});

const reducer = (state: initialState, action: ActionType) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;

      if (cartList.length > 0) {
        const oldRestaurantId = cartList[0].restaurantId
        const newRestaurantId = cartItem.restaurantId
        if (oldRestaurantId !== newRestaurantId) {
          cartList = [];
        }
      }

      let exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return { ...state, cart: filteredCart };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
        );

        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...cartList, cartItem] };

    default: {
      return state;
    }
  }
};

const PROTECTED_ROUTES = ['/orders', '/profile']
export const AppProvider: React.FC = ({ children }) => {
  const router = useRouter()
  const { isAuthenticated } = useAuth();

  const [state, dispatch] = useReducer(reducer, initialState, () => {
    let localData: initialState = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) : initialState
    if (!localData) {
      localData = { cart: [] }
    }

    return localData
  });

  useEffect(() => {
    if (!isAuthenticated && PROTECTED_ROUTES.includes(router.pathname)) {
      router.push({
        pathname: '/login',
        query: {
          redirectTo: router.asPath
        }
      })
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state, state.cart])

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext<ContextProps>(AppContext);

export default AppContext;
