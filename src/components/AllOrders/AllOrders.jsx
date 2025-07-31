import React, { useContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import Loader from '../Loader/Loader';
import { Token } from '../../Context/TokenConext';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function AllOrders() {
  const { userId } = useContext(Token);
  const { Data, IsLoading } = useFetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
console.log(Data)

  return (
    <>
      {IsLoading ? (
        <Loader />
      ) : (<>
        <div className='text-start container mx-auto ps-20 pt-10 '>
     <h1 className='text-4xl font-medium font-EncodeSansExpanded'>orders</h1>
     </div>
        <div className="flex container flex-wrap mx-auto p-20 pt-5 ">
          {Data?.data.map((order) =>
            order.cartItems.map((cartItem) => (
              <div className="sm:w-full md:w-1/2 lg:w-1/4 whish-border mt-4" key={cartItem.product._id}>
                <div className="overflow-hidden">
                  <Link to={`/productDetails/${cartItem.product._id}/${cartItem.product.category.name}`}>
                    <img
                      src={cartItem.product.imageCover}
                      alt={cartItem.product.title}
                      className="w-full"
                    />
                    <div className="space-y-1 ps-4 pe-4 pt-2 ">
                      <h3 className="font-semibold">{cartItem.product.title}</h3>
                      <p className="font-light">{cartItem.product.brand.name}</p>
                    </div>
                    <div className="text-start ps-4 pe-4 pt-2">
                      <p>${cartItem.price}</p>
                    </div>
                  </Link>
                  <div className="text-end  ">
                    <h5 className="text-1xl inline-block whish-btn p-2 text-white">
                      Count <span>{cartItem.count}</span>
                    </h5>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        </>
      )}
      <Helmet>
                <meta charSet="utf-8" />
                <title>Orders</title>
            
            </Helmet>
    </>
  );
}
