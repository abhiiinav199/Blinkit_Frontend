import React from 'react'
import DisplayPriceInRupees from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import ValidUrlConvert from '../utils/ValidUrlConvert'

const CardProduct = ({data}) => {
  const url = `/product/${ValidUrlConvert(data.name)}-${data._id}`
  return (
   <Link to={url} className="border lg:p-4 grid gap-2 lg:gap-3 max-w-32 lg:min-w-52 rounded  ">
      {/* 1st Image Section */}
      <div className="min-h-20 w-full max-h-24 lg:max-h-32  rounded ">
        <img src={data.image[0]} alt={data.name} className="w-full h-full object-scale-down lg:scale-120" />
      </div>

     
      <div className= "p-[1px] px-3 text-xs w-fit rounded text-green-600 bg-green-50">10min</div>

      <div className="px-1 font-medium text-ellipsis text-sm lg:text-base line-clamp-2 ">
        {data?.name}
      </div>

      <div className="w-fit px-1 text-sm lg:text-base">
        {data?.unit}
      </div>

      <div className="flex items-center justify-between gap-3 text-sm :lg:text-base">
         <div className="font-semibold">
          {DisplayPriceInRupees(data.price) }
         </div>
          <div className=""><button className='bg-green-600 hover:bg-green-700 text-white py-1 rounded cursor-pointer' >Add</button></div>
      </div>
    </Link>
  )
}

export default CardProduct