import React from "react";
import { createContext, useContext, useState } from 'react';
import {getTotalPriceOfBooks} from "../utils/cartService.js";

const ShoppingCartContext = createContext({
    showShoppingCart: false,
    setShowShoppingCart: () => {},
    totalPrice: 0,
    setTotalPrice: () => {}
})

export const useShoppingCart = () => useContext(ShoppingCartContext)

const ShoppingCartProvider = ({children})=>{
    const [showShoppingCart,setShowShoppingCart] = useState(false)
    const [totalPrice,setTotalPrice] = useState(getTotalPriceOfBooks())
    return(
        <ShoppingCartContext.Provider value={{showShoppingCart, setShowShoppingCart, totalPrice, setTotalPrice}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartProvider;
