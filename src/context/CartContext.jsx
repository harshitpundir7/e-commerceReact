import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) =>{
    const [cart, setCart] = useState(()=>{
        const savedCart = localStorage.getItem("cart")
        return savedCart ? JSON.parse(savedCart) : [];
    })
    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart));
    })
    function addCart(item) {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        
        if (existingItem) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 } 
                        : cartItem
                )
            );
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    }
    
    function removeCart(id){
        setCart(cart.filter((cartItem)=> cartItem.id !== id));
    }
    function clearCart(){
        setCart([]);
    }
    function incrementItemQuantity(id){
        setCart(
            cart.map((cartItem)=>
                cartItem.id === id
                ? {...cartItem, quantity: cartItem.quantity +1}
                : cartItem
            )
        )
    }
    function decrementItemQuantity(id){
        setCart(
            cart.map((cartItem)=>(
                cartItem.id === id && cartItem.quantity > 1
                ? {...cartItem, quantity: cartItem.quantity -1}
                : cartItem
            ))
        )
    }
    return(
        <CartContext.Provider value={{addCart, removeCart, clearCart , cart , setCart, decrementItemQuantity, incrementItemQuantity}}>
            {children}
        </CartContext.Provider>
    )
}