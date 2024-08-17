import CartContext from '@/context/CartContext'
import React, { useContext } from 'react'

function PromoCode() {
    const { cart,setCart } = useContext(CartContext)
    const {coupons,activeCoupon}=cart

    // function to apply coupons
    const applyCoupon=(activeCoupon)=>{
        setCart({...cart,activeCoupon})
    }

    // function to remove coupons
    const removeCoupon=()=>{
        setCart({...cart,activeCoupon:null})
    }
    return (
        <div className='p-4'>
            <h3 className='mb-4'>Best Coupon For You</h3>
            <div className='h-auto max-h-[250px] overflow-y-scroll'>
                {coupons.map(coupon => 
                    <div key={coupon.code} className='flex border border-gray-200 outline-none justify-between items-center p-3'>
                        <div>
                            <p className='text-sm'>{coupon.off}% off</p>
                            <div className='border border-dotted border-[#07de88] mt-2 p-2'>{coupon.code}</div>
                        </div>
                        {
                            activeCoupon ? 
                            activeCoupon.id===coupon.id && 
                            <button onClick={removeCoupon} className='border rounded border-cyan-950 text-cyan-950 p-2 px-3 h-10 font-semibold'>Remove</button>
                            :
                            <button onClick={()=>applyCoupon(coupon)} className='bg-cyan-950 p-2 px-3 h-10 text-white font-semibold'>Apply</button>

                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default PromoCode