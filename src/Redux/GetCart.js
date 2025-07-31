import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const initialState={
    cartlist:[],
    numberOfCartItems:0,
    totalprice:0,
    itemcount:0,
    cartId:null,
}
export const getCart = createAsyncThunk(
  "getcart/cart",
  async () => {        
    const token = localStorage.getItem("usertoken"); 
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart", 
      { headers: { token } }
    );
    return data;
  }
);

export const AddTOCart = createAsyncThunk(
  "AddTOCart/cart",
  async (productId) => {
    const token = localStorage.getItem("usertoken"); 
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart", 
      { productId },
      { headers: { token } }
    );
    return data;
  }
);

export const UpdateCart = createAsyncThunk(
  "UpdateCart/getcart",
  async ({ productId, count }) => {  
    const token = localStorage.getItem("usertoken");
    const { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
      { count }, 
      { headers: { token } }
    );
    return data.data;
  }
);

export const remove = createAsyncThunk(
  "remove/getcart",
  async (productId) => {
    const token = localStorage.getItem("usertoken");
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
      { headers: { token } }
    );
    return data;
  }
);

export const clearCart = createAsyncThunk(
  "clearCart/getcart",
  async () => {
    const token = localStorage.getItem("usertoken");
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart", 
      { headers: { token } }
    );
    return data;
  }
);

export const PayNow = createAsyncThunk(
  "payNow/getcart",
  async ({ cartId, values }) => {
    const token = localStorage.getItem("usertoken");
    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`,
      { values },
      { headers: { token } }
    );
    return data;
  }
);


const cart=createSlice({
    name:"getcart",
    initialState,
    extraReducers:(builder)=>{
    builder.addCase(getCart.fulfilled,(state,action)=>{
        state.numberOfCartItems=action.payload.numOfCartItems
       state.cartlist=action.payload.data.products
        state.totalprice=action.payload.data.totalCartPrice
        state.cartId=action.payload.cartId
    })
    .addCase(AddTOCart.fulfilled,(state,action)=>{
        state.numberOfCartItems=action.payload.numOfCartItems
        state.cartId=action.payload.cartId
    }).addCase(UpdateCart.fulfilled,(state,action)=>{
        state.totalprice=action.payload.totalCartPrice
        state.cartlist=action.payload.products
    }).addCase(remove.fulfilled,(state,action)=>{
        state.totalprice=action.payload.data.totalCartPrice
        state.numberOfCartItems=action.payload.numOfCartItems
        state.cartlist=action.payload.data.products
    }).addCase(clearCart.fulfilled,(state,action)=>{
        state.cartlist=[]
        state.numberOfCartItems=0
    }).addCase(PayNow.fulfilled,(state,action)=>{
      window.location.href=action.payload.session.url
    })
    

}
    

})
export const getcart=cart.reducer