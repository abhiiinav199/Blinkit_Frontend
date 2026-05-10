import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import { SummaryApi } from '../common/SummaryApi'
import axios from '../utils/axios'
import { useState } from 'react'

const ProductDisplayPage = () => {
  const [productDetails, setProductDetails] = useState({
    image: []
  })

  const params = useParams()
  const {product} = params
  
  const productId = product.split("-").pop() // remove pop if want to use id or name in another component because -The pop() method of Array instances removes the last element from an array and returns that element. This method changes the length of the array.



  const getProductDetails = async () =>{
    try {
      const res = await axios({...SummaryApi.getProductDetails,data:{productId}})
      console.log("res",res)
      setProductDetails(res.data.data)
      
    } catch (error) {
      AxiosToastError(error)
    }
  }
  useEffect(() =>{
    getProductDetails()

    
  },[productId])
  return (
    <div className="min-h-[78vh]">
      {productDetails?.image?.map((img,index) =>(
        <img src={img} alt={productDetails.name} key={index}/>
      ))}
    </div>
  )
}

export default ProductDisplayPage