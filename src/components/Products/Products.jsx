import React from 'react'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import {Helmet} from "react-helmet";
import Sale from '../SaleBar/Sale';

export default function Products() {
  return (
    <>
    <Sale/>
    <FeatureProducts/>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
            
            </Helmet>
    </>
  )
}
