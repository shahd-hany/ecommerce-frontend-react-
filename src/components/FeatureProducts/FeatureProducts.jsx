import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { AddTOCart } from "../../Redux/GetCart";
import useFetch from "../../Hooks/useFetch";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { addToWhishlist, getWhishList} from "../../Redux/WhishList";

export default function FeatureProducts() {
   const {whishlist ,wishListLoading}= useSelector((state)=>state.whishlistreducer)
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { Data, IsLoading } = useFetch("https://ecommerce.routemisr.com/api/v1/products");
  const [heartTrigger, setHeartTrigger] = useState(null); 
  async function addToCart(productId) {
    await dispatch(AddTOCart(productId));
    toast.success("Nice pick! 🛒 Your item is now in the cart", {
      duration: 4000,
    });
  }
  async function getwhishlist(){
      await dispatch(getWhishList())
    }

  function triggerHeart(productId) {
    setHeartTrigger(productId);
    setTimeout(() => {
      setHeartTrigger(null);
    }, 1000); 
  }

  useEffect(() => {
    if (Data?.data?.data) {
      const filteredProducts = Data.data.data.filter((product) => {
        return (
          product.brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFiltered(filteredProducts);
    }
    getwhishlist()
  }, [searchTerm, Data,whishlist]);

  return (
    <>
      {IsLoading ? (
        <Loader />
      ) : (
        <>
          <div className="mb-6 mx-auto w-3/4 mt-4 pt-20">
            <input
              name="search"
              type="search"
              id="search"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5"
              placeholder="Search"
              onInput={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="container mx-auto flex flex-wrap p-10 w-11/12 ">
            {filtered.map((product) => {
              const liked = whishlist.some((item) => item._id === product._id);
              return (
              <div className="sm:w-full md:w-1/2 lg:w-1/4 p-1" key={product._id} data-aos="fade-up">
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
                    <button onClick={() => {triggerHeart(product._id)
                      dispatch(addToWhishlist(product._id))
                    }}>
                    <i className={`fa fa-heart text-2xl ${liked?"text-red-700":"text-gray-500"} cursor-pointer hover:text-red-500 transition `}></i>
                    </button>
                    <AnimatePresence>
                      {heartTrigger === product._id && (
                        <motion.div
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 3, opacity: 0 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="absolute  top-[-500%] left-[30%]"
                        >
                          <i className="fa fa-heart text-red-500 text-9xl"></i>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="text-center">
                    <button
                      className="text-white btn w-3/4 rounded-lg cartBtn "
                      onClick={() => addToCart(product._id)}
                    >
                      <i className="fa fa-cart-shopping p-3"></i>Add to Cart
                    </button>
                  </div></div></div>
                  )})}
          </div>
        </>
      )}
    </>
  );
}
