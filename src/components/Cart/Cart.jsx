import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart, remove, UpdateCart } from '../../Redux/GetCart'
import { Link, useNavigate } from 'react-router-dom'
import emptyCart from '../../assets/empty-cart.jpg'
import {Helmet} from "react-helmet";
import { Token } from '../../Context/TokenConext'
export default function Cart() {
  const{cartlist,totalprice,}= useSelector((state)=>state.getcart)
  const{UserToken}=useContext(Token);
  const dispatch=useDispatch()
  const Navigate=useNavigate()
  async function GetCart(){
    await dispatch(getCart())
   }
    useEffect(() => {
       if (UserToken)
         GetCart()
         
     }, [UserToken])
  return (
    
<>
{cartlist.length!==0?<div className="flex flex-wrap p-28">
<div className="relative  shadow-md sm:rounded-lg sm:w-5/6 md:w-4/5 ">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <tbody>
     {cartlist.map((product)=>(
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600" key={product.product._id}>
        <td className="p-4 flex gap-4  items-center content-center pl-12">
        <button onClick={()=>{
          dispatch(remove(product.product._id))
        }}className=' border border-slate-200 w-10 h-10 rounded-full text-center ' type='button'><i className="fa-solid fa-x text-sm "></i></button>
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button 
            
            onClick={()=>{
              if (product.count > 1)
                dispatch(UpdateCart({ productId: product.product._id, count: product.count - 1 }))
            }}className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={product.count} required />
            </div>
            <button onClick={()=>{
               dispatch(UpdateCart({ productId: product.product._id, count: product.count +1 }))
            }}className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-lg">
          <span className='text-gray-500 pr-2 text-sm'>total</span>{product.price*product.count}
        </td>
      </tr>
     ))}
    </tbody>
  </table>
</div>
<div className="pt-4 sm:w-3/4 sm:m-auto md:w-[22%] bg-white text-left h-[350px] rounded-lg p-4 flex items-center content-center md:fixed md:right-3 md:top-[120px] shadow-xl">
<div className='space-y-7 w-full'>
<h2 className='font-bold font-Roboto text-lg'>Summery</h2>
<div className="flex justify-between">
  <h5 className='font-semibold'>Total</h5>
  <h3 className='font-extrabold'>{totalprice}</h3>
</div>
<Link to={"/checkout"} className='bg-black text-white text-center rounded-lg w-full block py-4'>Check Out</Link>
<button onClick={()=>{
  dispatch(clearCart())
  Navigate("/home")
}}className='bg-white main-color border border-gray-500 text-center rounded-lg w-full block py-4'>Clear your Cart</button>
</div>
</div>
</div>:<div className='flex w-full text-center mx-auto gap-8 items-center content-center p-10 '>
  <div className='w-[500px] h-[500px] bg-white p-14 rounded-full overflow-hidden '><img src={emptyCart} className='object-cover'></img></div>
  <div className='space-y-6'><h1 className='font-extrabold font-Roboto '>Your cart is empty</h1>
  <p className='font-bold text-gray-600 font-Roboto'>looks like you have not added anything to your cart . Go ahead and explore top categoreies.</p></div>

</div>}
<Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            
            </Helmet>

</>
  )
}
