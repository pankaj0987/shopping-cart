//assuming all these are api's that perform CRUD operation in database(here localstorage is our database)

// this function used to get carts items from database

const getCartItems=()=>{
    let cartArray=[]
    const cartItems=localStorage.getItem("cart");
    if(cartItems){
        cartArray=JSON.parse(cartItems);
    }
    return cartArray;
}

// this function takes the product details and add it to cart

const addToCart=(product)=>{
    let cartArray=[]
    const cartItems=localStorage.getItem("cart");
    if(cartItems){
        cartArray=JSON.parse(cartItems);
    }
    
    cartArray.push(product)
    localStorage.setItem("cart",JSON.stringify(cartArray))
}

// this function increment the quantity
const incrementQuantity=(id)=>{
    let cartArray=[]
    const cartItems=localStorage.getItem("cart");
    if(cartItems){
        cartArray=JSON.parse(cartItems);
    }
    let index=cartArray.findIndex(item=>item.id==id)
    cartArray[index].quantity++;
    localStorage.setItem("cart",JSON.stringify(cartArray))
}

// this function decrement the quantity
const decrementQuantity=(id)=>{
    let cartArray=[]
    const cartItems=localStorage.getItem("cart");
    if(cartItems){
        cartArray=JSON.parse(cartItems);
    }
    let index=cartArray.findIndex(item=>item.id==id)

    if(cartArray[index].quantity<2){
        cartArray.splice(index,1)
    }
    else cartArray[index].quantity--;

    localStorage.setItem("cart",JSON.stringify(cartArray))
}

const removeFromCart=(id)=>{
    let cartArray=[]
    const cartItems=localStorage.getItem("cart");
    if(cartItems){
        cartArray=JSON.parse(cartItems);
    }

    if(cartArray.length>0){
        let newArray=cartArray.filter(item=>item.id!==id)
        localStorage.setItem("cart",JSON.stringify(newArray))
    }


}
export {addToCart,incrementQuantity,getCartItems,removeFromCart,decrementQuantity}