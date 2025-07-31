import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    whishlist: [],
    wishListLoading: false,
    items: 0,
}

export const addToWhishlist = createAsyncThunk(
    "addToWhishlist/whishlist",
    async (productId) => {
        const token=localStorage.getItem('usertoken');
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId }, { headers:{token} })
        return data
    }
)
export const getWhishList = createAsyncThunk(
    "getWhishList/whishlist",
    async () => {
        const token=localStorage.getItem('usertoken');
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers:{token} })
        return data
    }
)
export const removeFromWhish = createAsyncThunk(
    "removeFromWhish/whishlist",
    async (productId) => {
        const token=localStorage.getItem('usertoken');
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers:{token}})
        return data
    }
)

const WhishList = createSlice({
    name: "whishlist",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addToWhishlist.pending, (state, action) => {
                state.wishListLoading = true
            })
            .addCase(addToWhishlist.fulfilled, (state, action) => {
                state.whishlist = action.payload.data
                state.wishListLoading = false
                state.items = action.payload.data.length
            }).addCase(getWhishList.fulfilled, (state, action) => {
                state.whishlist = action.payload.data
                state.items = action.payload.data.length
            }).addCase(removeFromWhish.fulfilled, (state, action) => {
                state.whishlist = state.whishlist.filter(item => item._id !== action.meta.arg);
                state.items = state.whishlist.length;
            })


    }
})
export const whishlistReducer = WhishList.reducer