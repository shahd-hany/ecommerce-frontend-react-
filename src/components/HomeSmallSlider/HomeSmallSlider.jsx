import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function HomeSmallSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    arrows:false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  async function RecentProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products?limit=10&page=2");
  }

  const { data } = useQuery({
    queryKey: ["recentproducts"],
    queryFn: RecentProducts,
  });

  return (
    <div className="container mx-auto p-10">
      <Slider ref={sliderRef} {...settings}>
        {data?.data?.data.map((product) => (
          <div key={product.id } className="px-2">
            <img src={product.imageCover} className="h-[300px] w-full object-cover rounded-lg" alt={product.title} />
          </div>
        ))}
      </Slider>

     
      <div className="flex justify-center mt-4 space-x-3">
        <button
          className={"slider-button "}
          onClick={() => sliderRef.current?.slickGoTo(currentSlide - 1)}
        />
        <button
          className={"slider-button "}
          onClick={() => sliderRef.current?.slickGoTo(currentSlide + 1)}
        />
      </div>
    </div>
  );
}
