import DisplayPriceInRupees from "../utils/DisplayPriceInRupees";
import { Link } from "react-router-dom";
import ValidUrlConvert from "../utils/ValidUrlConvert";
import PriceWithDiscount from "../utils/PriceWithDiscount";
import axios from "../utils/axios"
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";


const CardProduct = ({ data }) => {
  const [loading, setLoading] = useState(false)
  const {fetchCartItem} = useGlobalContext()
  const url = `/product/${ValidUrlConvert(data.name)}-${data._id}`;

  const handleAddToCart= async(e) =>{
    e.stopPropagation() //parent events ko rokta hai
    e.preventDefault() //browser/Link ka default action rokta hai
    try {
      setLoading(true)
      const res= await axios({
        ...SummaryApi.addToCart,
        data:{
          productId: data?._id,
        }

      })

      const {data : responseData} = res
      const {success, message, error} = responseData
      if(success){
        toast.success(message)
        fetchCartItem()
      }
      else{
        AxiosToastError(error)
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  
  return (
    <Link
      to={url}
      className="border py-2 lg:p-4 grid gap-2 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white "
    >
      {/* 1st Image Section */}
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden ">
        <img
          src={data.image[0]}
          alt={data.name}
          className="w-full h-full object-scale-down lg:scale-120"
        />
      </div>

      <div className="flex items-center gap-1">
        <div className="p-[1px] px-3 text-xs w-fit rounded text-green-600 bg-green-50">
          10min
        </div>
        <div>
          {Boolean(data?.discount) && (
            <p className="text-[.7rem] lg:text-sm bg-green-100 text-green-600">
              {data?.discount}%Discount
            </p>
          )}
        </div>
      </div>

      <div className="px-1 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2 ">
        {data?.name}
      </div>

      <div className="w-fit gap-2 px-1 lg:px-0  text-sm lg:text-base">
        {data?.unit}
      </div>

      <div className="px-2 lg:px-0  flex items-center justify-between gap-1 lg:gap-3 text-sm :lg:text-base">
        <div className="">
          <div className="font-semibold ">
            {DisplayPriceInRupees(
              PriceWithDiscount(data?.price, data?.discount),
            )}
          </div>
        </div>

        <div className="">
          {data?.stock === 0 ? (
            <p className="text-red-500 text-sm text-center">Out Of Stock</p>
          ) : (
            <button onClick={handleAddToCart} className="bg-green-600 hover:bg-green-700 px-1 lg:px-4 text-white py-1 rounded cursor-pointer">
              Add
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
