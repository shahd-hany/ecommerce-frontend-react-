import React, { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Slider from 'react-slick'
import axios from 'axios'
export default function CategorySlider() {
  const [CurrentSlide, setCurrentSlide] = useState(0)
  const sliderRef=useRef()
  const settings = {
    arrows:false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1, 
    autoplay: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };
async function getCategory(){
  return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
}
const {data}=useQuery({
  queryKey: ['category'],
  queryFn:getCategory
})
  return (
   <>
    <div className="container mx-auto py-10 w-3/4">
      <Slider ref={sliderRef} {...settings}>
        {data?.data.data.map((product) => (
          <div key={product._id} className="px-2 overflow-hidden ">
            <div className="category-slider overflow-hidden h-[100px] w-[100px]">
            <img src={product.image} className=" w-full h-full object-cover" alt={product.title} /></div>
            <h3 className='text-lg font-semibold'>{product.name}</h3>
          </div>

        ))}
      </Slider>

     
      <div className="flex justify-center mt-4 space-x-3">
        <button
          className={"slider-button "}
          onClick={()=>sliderRef.current.slickGoTo(CurrentSlide-1)}
          disabled={CurrentSlide==0}
        />
         <button
          className={"slider-button "}
          onClick={()=>sliderRef.current.slickGoTo(CurrentSlide+1)}
        />
      </div>
    </div>

   </>
  )
}
