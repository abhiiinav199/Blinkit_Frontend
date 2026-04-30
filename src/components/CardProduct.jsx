import React from 'react'
import DisplayPriceInRupees from '../utils/DisplayPriceInRupees'

const CardProduct = ({data}) => {
  return (
   <div  className="border p-4 grid gap-3 max-w-52 lg:min-w-52 rounded  ">
      {/* 1st Image Section */}
      <div className="min-h-20 max-h-32  rounded ">
        <img src={data.image[0]} alt={data.name} className="w-full h-full object-scale-down lg:scale-120" />
      </div>

     
      <div className= "p-[1px] px-3 text-sm w-fit rounded text-green-600 bg-green-50">10min</div>

      <div className="font-medium text-ellipsis line-clamp-2 ">
        {data?.name}
      </div>

      <div className="w-fit">
        {data?.unit}
      </div>

      <div className="flex items-center justify-between gap-3">
         <div className="font-semibold">
          {DisplayPriceInRupees(data.price) }
         </div>
          <div className=""><button className='bg-green-600 hover:bg-green-700 text-white py-1 rounded cursor-pointer' >Add</button></div>
      </div>
    </div>
  )
}

export default CardProduct