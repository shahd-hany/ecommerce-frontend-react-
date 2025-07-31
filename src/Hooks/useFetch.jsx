import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from 'axios';
export default function useFetch(url) {
    async function GetFeatureProducts(){
        return await axios.get(url)
      }
      const {data ,isLoading}=useQuery({
        queryKey: ["featuredproducts", url],
        queryFn:GetFeatureProducts,
      })
  return (
    {Data:data ,IsLoading:isLoading}
  )
}
