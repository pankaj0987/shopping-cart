import { decrementQuantity, incrementQuantity, removeFromCart } from '@/api/cartActions'
import CartContext from '@/context/CartContext'
import { currencyFormatter } from '@/utils/currencyFormatter'
import Image from 'next/image'
import React, { useContext } from 'react'

function CartItem({item}) {
  const {cart,setCart}=useContext(CartContext)
  const {cartItems}=cart

  // debounce function to prevent remove button clicks
  function debounce(func, delay) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  // function to remove item from cart and calls api to delete it form databse
  const removeItemFromCartHandler = (id) => {
    let newArray = cartItems.filter(item => item.id !== id);
    setCart(prevCart => ({ ...prevCart, cartItems: newArray }));
  
    // Removing item from database
    removeFromCart(id);
  };

  const removeItemFromCart = debounce(removeItemFromCartHandler, 300);

  // function to decriment quantity from cart and calls api to update databse
  const decreaseQuantity=()=>{
    let index=cartItems.findIndex(product=>product.id===item.id)
    if(cartItems[index].quantity>1)
      cartItems[index].quantity--;
    else cartItems.splice(index,1)
    setCart({...cart,cartItems:[...cartItems]})

    // decrementing quantity from database
    decrementQuantity(item.id)
  }

  // function to increment quantity from cart and calls api to update databse
  const increaseQuantity=()=>{
    let index=cartItems.findIndex(product=>product.id===item.id)
    cartItems[index].quantity++;
    setCart({...cart,cartItems:[...cartItems]})

    // inrementing quantity in database
    incrementQuantity(item.id)
  }
  return (
    <div className='flex border border-b-[#f0f0f0] px-4 py-6'>
      <div>
      <div className='w-16 md:w-28 h-16 md:h-28'>
        <Image className='object-contain w-full h-full' src={item.image} alt='cartitem' height={120} width={120}/>
      </div>
      </div>
      <div className='flex grow flex-col px-3 md:px-8 h-auto'>
        <h4 className='text-sm sm:text-lg md:text-xl line-clamp-2'>{item.title}</h4>
        <p className='mt-3'>{currencyFormatter.format(item.price * item.quantity)}</p>
        <div className='flex mt-5 ms-1 w-[90px] md:w-[120px]'>
          <button className='flex items-center justify-center border rounded-full border-[#c2c2c2] w-6 h-6' onClick={decreaseQuantity}>-</button>
          <span className='grow text-center mx-1 border border-[#c2c2c2]'>{item.quantity}</span>
          <button className='flex items-center justify-center border rounded-full border-[#c2c2c2] w-6 h-6' onClick={increaseQuantity}>+</button>
        </div>
        <p className='grow'></p>
      </div>
      <div className='pe-5'>
       <button className='text-sm md:text-md border-0 w-fit' onClick={()=>removeItemFromCart(item.id)}>Remove</button>
      </div>
        
    </div>
  )
}

export default CartItem