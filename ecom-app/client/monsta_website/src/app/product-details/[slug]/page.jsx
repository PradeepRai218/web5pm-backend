import Product_detail_page from '@/app/commanComponents/Product_detail_page'
import { getProductDetails } from '@/app/services/homeServices';
import React from 'react'


export default async function page( req ) {
  let {slug}=await req.params;

  let data=await getProductDetails(slug)
  console.log(data);
  
  
  return (
    <div>
      <Product_detail_page productDetails={data}/>
    </div>
  )
}
