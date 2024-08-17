import { addToCart, incrementQuantity } from '@/api/cartActions'
import CartContext from '@/context/CartContext'
import { currencyFormatter } from '@/utils/currencyFormatter'
import Image from 'next/image'
import React, { useContext, useRef } from 'react'

function ProductCard({ product }) {
  const { cart, setCart } = useContext(CartContext)
  const { cartItems } = cart
  const imgRef = useRef()

  // function to trigger cart addition animation 
  const animate = () => {
    const shopping_cart = document.getElementById("shopping-cart")
    const img = imgRef
    let flying_img = img.current.cloneNode();
    flying_img.classList.add('flying-img');
    img.current.parentNode.style.zIndex = "1000";
    img.current.parentNode.appendChild(flying_img);

    const flying_img_pos = flying_img.getBoundingClientRect();
    const shopping_cart_pos = shopping_cart.getBoundingClientRect();

    let data = {
      left: shopping_cart_pos.left - (shopping_cart_pos.width / 2 + flying_img_pos.left + flying_img_pos.width / 2),
      top: flying_img_pos.top - shopping_cart_pos.top + 100
    }

    flying_img.style.cssText = `
    --left : ${data.left.toFixed(2)}px;
    --top : ${data.top.toFixed(2)}px;
    `;


    setTimeout(() => {
      img.current.parentNode.style.zIndex = "";
      img.current.parentNode.removeChild(flying_img);
    }, 1000);
  }

  // function to add item to cart ans also cals api to add it to database as well
  const addItemToCart = () => {
    animate()


    // finding if item already present in cart
    const index = cartItems.findIndex(item => item.id == product.id)

    if (index != -1) {

      //incrementing product quanitity in global cart state
      cartItems[index].quantity++;
      setCart({ ...cart, cartItems: [...cartItems] })

      //incrementing quantity in database also
      incrementQuantity(product.id)
    }
    else {
      let item = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      }

      //adding product in global cart state
      setCart({ ...cart, cartItems: [...cartItems, item] })

      //adding product in database also
      addToCart(item)
    }
  }

  return (
    <div className="flex justify-center">
      <div className='shadow-lg p-4 border-2 border-gray-100 rounded-lg w-full max-w-72'>
        <div className='relative w-full max-w-52 h-60 mx-auto my-4'>
          <Image ref={imgRef} className='object-contain w-full h-full' src={product.image} width={200} height={200} alt='img' />
        </div>
        <div>
          <h2 className='mt-5 text-lg overflow-hidden whitespace-nowrap text-ellipsis truncate'>{product.title}</h2>
          <p className='text-xl mt-2 text-gray-900 font-semibold	'>{currencyFormatter.format(product.price)}</p>
          <button onClick={addItemToCart} className="bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out bg-[length:200%_100%] bg-left hover:bg-right px-4 py-2 text-white font-semibold w-full mt-5 rounded-full">
            Add To Cart
          </button>
        </div>
      </div>
    </div>

  )
}

export default ProductCard