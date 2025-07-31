import {configureStore } from '@reduxjs/toolkit'
import { getcart } from './GetCart'
import { whishlistReducer } from './WhishList'
export const Store =configureStore({
    reducer:{
        getcart:getcart,
        whishlistreducer:whishlistReducer,
    }
})