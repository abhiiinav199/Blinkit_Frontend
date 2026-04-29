import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AxiosToastError from "../utils/AxiosToastError"
import axios from "../utils/axios"
import { SummaryApi } from "../common/SummaryApi"

const CategoryWiseProductDisplay = ({id,name}) => {
  const [data, setdata] = useState([])

  const fetchCategoryWiseProduct = async() =>{
    try {
      const res = await axios({
        ...SummaryApi.getProductByCategory,
        data:{
          id: id
        }
      })
      const {data :responseData} = res
      console.log("CategoryWiseProductDisplay",responseData)
   
      if(responseData?.success){
        setdata(responseData?.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }


  useEffect(()=>{
    fetchCategoryWiseProduct()
  },[])
  return (
   <div >
          <div className="container mx-auto p-4 flex items-center justify-between gap-4">
              <h3 className="text-semibold text-lg md:text-xl ">{name}</h3>
              <Link className="text-green-400 hover:text-green-600" to="">See All</Link>
          </div>

         
          <div className="container mx-auto">
           
          </div>
        </div>
  )
}

export default CategoryWiseProductDisplay