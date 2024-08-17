'use client'
import CartContext from "./CartContext";
import { useState } from "react";

function CartContextProvider({children}) {
  const [cart,setCart]=useState({
    cartItems:[],
    loading:true,
    coupons:[
      {
        id:1,
        off:"10",
        code:"TYHFDERI"
      },
      {
        id:2,
        off:"15",
        code:"TYHKJHRI"
      },
      {
        id:3,
        off:"20",
        code:"FERSJHRI"
      },
      {
        id:4,
        off:"30",
        code:"KOJGFDJI"
      }
    ],
    activeCoupon:null
  })
  return (
    <CartContext.Provider value={{cart,setCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider