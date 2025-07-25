import { createContext, use, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) =>{

    const currency = 'Rs.';
    const delivery_fee = 50;
    const[search,setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const addToCart = async(itemId,size)=>{
        if(!size){
            toast.error('Select Product Size');
            return;
        }
        console.log(itemId,size);
       let cartData= structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    useEffect(()=>{

    },[])

    const getCartCount = ()=>{
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                }catch(error){

                }
            }
        }
        return totalCount;
    }
    const updateQuantity = async(itemId, size , quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }
    const getCartAmount = ()=>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0 && itemInfo && typeof itemInfo.price === 'number'){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }
                catch(error){
                    console.error("Error calculating cart amount:", error);
                }
            }
        }
        return totalAmount;
    }
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,cartItems,setCartItems,addToCart,
        getCartCount,
        updateQuantity,getCartAmount,
        navigate
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
