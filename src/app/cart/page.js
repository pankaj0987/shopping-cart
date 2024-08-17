'use client'

import CartItem from "@/components/CartItem"
import CartPrice from "@/components/CartPrice"
import EmptyCart from "@/components/EmptyCart"
import Loader from "@/components/Loader"
import PromoCode from "@/components/PromoCode"
import CartContext from "@/context/CartContext"
import { useContext } from "react"


function page() {
    const { cart } = useContext(CartContext)
    const { cartItems, loading } = cart;
    return (
        <div className="min-h-[calc(100vh-80px)]">
            <div className="container flex flex-col lg:flex-row mx-auto py-5">

                {
                    loading ?
                        // showing loader untill data get fetched from database
                        <Loader />
                        :
                        cartItems.length > 0 ?
                            // showing our cart compoonent
                            <>
                                <div className="w-full lg:w-[70%] lg:p-4">
                                    <div className="border bg-white border-[#f0f0f0]">
                                        {cartItems.map(item => <CartItem key={item.id} item={item} />)}
                                    </div>
                                </div>
                                <div className="w-full lg:w-[30%] pt-4 lg:px-4 lg:pe-0">
                                    <div className="border-2 bg-white border-[#f0f0f0]">
                                        <CartPrice />
                                    </div>
                                    <div className="border-2 bg-white border-[#f0f0f0] mt-4">
                                        <PromoCode/>
                                    </div>
                                </div>
                            </>
                            :
                            // showing emty cart template when our cart is empty
                            <EmptyCart/>
                }
            </div>
        </div>
    )
}

export default page