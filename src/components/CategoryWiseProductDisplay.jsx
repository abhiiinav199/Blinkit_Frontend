import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import AxiosToastError from "../utils/AxiosToastError"
import axios from "../utils/axios"
import { SummaryApi } from "../common/SummaryApi"
import CardLoading from "./CardLoading"
import CardProduct from "./CardProduct"
import {FaAngleLeft, FaAngleRight} from "react-icons/fa6"

const CategoryWiseProductDisplay = ({id,name}) => {
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(false)
  const containerRef = useRef()


  const fetchCategoryWiseProduct = async() =>{
    try {
      setloading(true)
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
    }finally{
      setloading(false)
    }
  }

  const handleScrollRight = () =>{
    containerRef.current.scrollLeft +=200
  }

  const handleScrollLeft = () =>{
    containerRef.current.scrollLeft -=200
  }


  useEffect(()=>{
    fetchCategoryWiseProduct()
  },[])

  const loadingCardNumber= new Array(6).fill(null)
  return (
   <div >
          <div className="container mx-auto p-4 flex items-center justify-between gap-2 sm:gap-4">
              <h3 className="text-semibold  text-lg md:text-xl ">{name}</h3>
              <Link className="text-green-400  hover:text-green-600" to="">See All</Link>
          </div>

         {/* Skeleton Loading */}
          <div className="container mx-auto flex items-center gap-4 md:gap-6 lg:gap-8 px-4 overflow-hidden scroll-smooth" ref={containerRef}>
            {
              loading &&
              loadingCardNumber.map((_, index) =>(
                <CardLoading key={index}/>

              ))
            }

            {/* Maping over data */}
            {
            data?.map((item, index) =>(
              <CardProduct key={index} data={item}/>
            ))
            }

            <div className="w-full left-0 right-0 px-2 container mx-auto absolute hidden lg:flex justify-between">
              <button onClick={handleScrollLeft} className="relative  bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full cursor-pointer text-lg"><FaAngleLeft/></button>
              <button onClick={handleScrollRight} className="relative bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full cursor-pointer text-lg"><FaAngleRight/></button>
            </div>
          </div>
        </div>
  )
}

export default CategoryWiseProductDisplay