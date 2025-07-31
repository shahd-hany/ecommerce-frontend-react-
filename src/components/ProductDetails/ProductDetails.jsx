import React, { useEffect, useState } from 'react'
import { useParams ,Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick';
import useFetch from '../../Hooks/useFetch';
import Loader from '../Loader/Loader';
import {Helmet} from "react-helmet";
import { AddTOCart } from "../../Redux/GetCart";
import { addToWhishlist} from "../../Redux/WhishList";
import { useDispatch} from 'react-redux'
import toast from "react-hot-toast";
export default function ProductDetails() {
  const dispatch = useDispatch();
  const [product, setproduct] = useState({})
  const [relatedProducts, setrelatedProducts] = useState([])
  const [loading, setloading] = useState(false)
  const {productId,categoryName}= useParams()
  const{Data}=useFetch("https://ecommerce.routemisr.com/api/v1/products")

  async function getProductDetails(){
  setloading(true)
  const {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
  setproduct(data.data)
  window.scrollTo({top:0})
  setloading(false)
  return data
 }

 async function addToCart(productId) {
    await dispatch(AddTOCart(productId));
    toast.success("Nice pick! 🛒 Your item is now in the cart", {
      duration: 4000,
    });
  }

 function RelatedProducts(){
  const related=Data?.data.data.filter((product)=>product.category.name == categoryName)
  setrelatedProducts(related)
 }

 const settings = {
  dots: true,
  infinite: true,
  arrows:false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};
 useEffect(()=>{
   getProductDetails()
   RelatedProducts()
 },[productId])
  return (
    <>
    {
      loading? (
      <Loader/>

      ):
      (<>
       <div className="container mx-auto pt-28">
      <div className="flex">
        <div className="w-1/4 pb-[25px]">
          <Slider {...settings}>
            {product.images?.map((image, index) => (
              <img key={index} src={image} alt="Product Image" />
            ))}
          </Slider>
        </div>
        <div className="w-3/4 p-24 space-y-4">
          <h1 className="text-black text-2xl font-font-roboto">{product.title}</h1>
          <h3 className="text-gray-700">{product.description}</h3>
          <p className="pt-[20px] text-xl">{product.category?.name}</p>
          <div className="flex justify-between p-5">
            <p>${product.price}</p>
            <div>
              <i className="fa fa-star text-yellow-300"></i>
              <span>{product.ratingsAverage}</span>
            </div>
          </div>
          <Helmet>
                <meta charSet="utf-8" />
                <title>{product.title}</title>
            
            </Helmet>
        </div>
      </div>
      <div className="w-11/12 pb-[5%] text-end">
                          <button onClick={() => {
                            dispatch(addToWhishlist(product.id))
                          }}>
                          <i className={`fa fa-heart text-3xl text-gray-500 cursor-pointer hover:text-red-500 transition `}></i>
                          </button></div>
      <button onClick={()=>{
            {addToCart(product._id)}
          }}className="text-white btn w-full rounded-lg">
        <i className="fa fa-cart-shopping p-3"></i>Add to Cart
      </button>
    </div>
     <div className="container mx-auto space-y-8 pt-10">
    <h1 className='text-gray-600 text-2xl font-EncodeSansExpanded'>Related Products</h1>
    <div className="container mx-auto flex flex-wrap">
    {relatedProducts?.map((product) => (
        <div className="sm:w-full md:w-1/2 lg:w-1/4 p-1" key={product._id}>
        <div className="product rounded-lg overflow-hidden relative">
          <Link to={`/productDetails/${product._id}/${product.category.name}`}>
            <img src={product.imageCover} alt={product.name} className="w-full" />
            <h3 className="main-color pt-2 ps-2">{product.category.name}</h3>
            <div className="mt-5 ps-2 pe-2">
              <p className="font-semibold">{product.title.split(" ").splice(0, 2).join(" ")}</p>
              <div className="flex justify-between pt-2">
                <p>{product.price}</p>
                <div>
                  <i className="fa fa-star text-yellow-300"></i>
                  <span>{product.ratingsAverage}</span>
                </div>
              </div>
            </div>
          </Link>
          <div className="text-end p-4 pr-3 relative">
            <button onClick={() => {
              dispatch(addToWhishlist(product._id))
            }}>
            <i className={`fa fa-heart text-2xl text-gray-500 cursor-pointer hover:text-red-500 transition `}></i>
            </button>
          </div>

          <div className="text-center">
            <button
              className="text-white btn w-3/4 rounded-lg cartBtn"
              onClick={() => {addToCart(product._id)}}
            >
              <i className="fa fa-cart-shopping p-3"></i>Add to Cart
            </button>
          </div></div></div>
      ))}
    </div>
  
    </div>
      </>)
    }
    
  
    </>
  )
}
