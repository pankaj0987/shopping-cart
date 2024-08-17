'use client'
import React, { useContext, useEffect } from 'react'
import CartContext from '../context/CartContext'
import { getCartItems } from '../api/cartActions'
import Link from 'next/link'

function Header() {
  const { cart, setCart } = useContext(CartContext)

  // getting inital data from database
  useEffect(() => {
    const data = getCartItems()
    setCart({...cart,cartItems:data,loading:false})
}, [])

return (
    <div className='fixed z-50 left-0 right-0 top-0 bg-blue-500 h-20'>
      <div className='container h-full mx-auto flex justify-between items-center text-white text-xl'>
        <Link className='font-bold' href="/">E-Kart</Link>
        <Link href={"/cart"} className='relative cursor-pointer'>
          {cart.cartItems.length > 0 &&
            <span className="absolute inline-flex items-center justify-center top-[-5px] left-1/2 transform -translate-x-1/2 z-10 text-center rounded-full w-[22px] h-[22px] bg-[#ff6161] border border-white font-normal text-[#f0f0f0] text-[12px]">
              {cart.cartItems.length}
            </span>
          }
          <svg id='shopping-cart' width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path className="cziJ98" d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" fill="#fff"></path></svg>
        </Link>
      </div>
    </div>
  )
}

export default Header