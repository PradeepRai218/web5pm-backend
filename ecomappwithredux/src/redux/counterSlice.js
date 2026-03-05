import { createSlice } from "@reduxjs/toolkit";

export let counterSlice=createSlice(
    {
        name:"counter",
        initialState:{
            count:0,
        },
        reducers:{ //Action
            //state  =>old State --> { count:0 }
            increment:( state )=>{
                state.count+=1
            },
             decrement: (state) => {
                state.count -= 1
            },
        }
    }

)

export let {increment,decrement} =counterSlice.actions
export default counterSlice.reducer