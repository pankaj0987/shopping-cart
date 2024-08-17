import CartContext from '@/context/CartContext'
import { currencyFormatter } from '@/utils/currencyFormatter'
import React, { useContext, useEffect, useState } from 'react'

function CartPrice() {
    const { cart } = useContext(CartContext)
    const {cartItems,activeCoupon}=cart
    const [subTotal, setSubTotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        // calculating sub total
        let subTotal = cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
        setSubTotal(subTotal.toFixed(2))
        
        //calculating discount according to active coupon 
        let discount=0
        if(activeCoupon){
            discount=((subTotal*activeCoupon.off)/100).toFixed(2);
            setDiscount(discount)
        }
        else setDiscount(0)

        // calulation grand total after discount applied
        setTotal((subTotal.toFixed(2)-discount).toFixed(2))
    }, [cart])


    return (
        <div>
            <div className='border-b border-b-[#f0f0f0]'>
                <h3 className='p-3'>Price Details</h3>
            </div>
            <div className='p-3 border-b border-b-[#f0f0f0]'>
                <div className='flex py-3 justify-between'>
                    <span>Price</span><span>{currencyFormatter.format(subTotal)}</span>
                </div>
                <div className='flex py-3 justify-between'>
                    <span>Discount</span><span className='text-[#388e3c]'>-{currencyFormatter.format(discount)}</span>
                </div>
            </div>
            <div className={`p-3 flex justify-between ${discount>0?"border-b border-b-[#f0f0f0]":""} text-lg font-semibold`}>
                <span>Total Amount</span><span>{currencyFormatter.format(total)}</span>
            </div>
            {
                discount>0 && <div className='px-3 py-2 text-[#388e3c] font-semibold'>You will save {currencyFormatter.format(discount)} on this order</div>
            }
        </div>
    )
}

export default CartPrice