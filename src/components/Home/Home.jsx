import React from 'react'
import HomeSmallSlider from '../HomeSmallSlider/HomeSmallSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import { Helmet } from "react-helmet";
import main from '../../assets/main.jpg'
import Sale from '../SaleBar/Sale';
export default function Home() {
  return (
    <>
      <div className="Home-img flex items-end">
        <div className='p-28'>
          <h1>start with the basics</h1>
        </div>
      </div>

      <HomeSmallSlider />
      <CategorySlider />
      <Sale />
      <FeatureProducts />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>

      </Helmet>
    </>
  )
}
