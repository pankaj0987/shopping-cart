import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function EmptyCart() {
  return (
    <div className="w-full h-[calc(100vh-124px)] flex flex-col justify-center items-center bg-white border border-[#f0f0f0]">
      <Image src="/empty-cart.png" width={300} height={300} alt="emty cart" />
      <p className="text-2xl mt-4">Your cart is empty</p>
      <Link href="/" className="text-center bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out bg-[length:200%_100%] bg-left hover:bg-right px-4 py-2 text-white font-semibold w-[240px] mt-10 rounded-full">
        Add To Cart
      </Link>
    </div>
  )
}

export default EmptyCart