
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import axios from '../utils/axios'

const Product = () => {
  const [productData,setProductData] = useState([])
  const [page,setPage] = useState(1)
  
  const fetchProductData = async()=>{
    try {
        const res = await axios({
           ...SummaryApi.getProduct,
           data : {
              page : page,
           }
        })

        const { data : responseData } = res

        console.log("product page ",responseData)
        if(responseData.success){
          
          setProductData(responseData.data)
        }

    } catch (error) {
      AxiosToastError(error)
    }
  }
  
//   console.log("product page")
  useEffect(()=>{
    fetchProductData()
  },[])

  return (
    <div>
      Product
    </div>
  )
}

export default Product
