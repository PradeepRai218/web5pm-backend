import { createSlice } from "@reduxjs/toolkit";

export let cartSlice=createSlice(
    {
        name:"cart",
        initialState:{
            cart: localStorage.getItem("CART") ? JSON.parse(localStorage.getItem("CART")) : []  ,
        },
        reducers:{ //Action
            //state  =>old State --> { cart:[ ] }
            addToCart:( state,req )=>{
               
               let  cartobj=req.payload //Object {  title:'',prcie:500 } 
                
               state.cart.unshift(cartobj)
               localStorage.setItem("CART",JSON.stringify(state.cart))

            },
             deleteCart: (state,req) => {
                let id=req.payload //1
                state.cart=state.cart.filter((obj)=>obj.id!=id)
                localStorage.setItem("CART",JSON.stringify(state.cart))
            },
              changeQty: (state) => {
                
            },
        }
    }

)

export let {addToCart,deleteCart,changeQty} =cartSlice.actions
export default cartSlice.reducer