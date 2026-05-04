import React from 'react'
import { useParams } from 'react-router-dom'

const ProductListPage = () => {
  const params = useParams()
  
  return (
    <section className="min-h-[78vh] mt-3 sm:mt-0 sticky top-26 lg:top-20">
      <div className='container sticky top-26 mx-auto grid grid-cols-[80px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]'>
        {/* Sub Category */}
        <div className=' bg-green-400 min-h-[78vh] '>
        sub category
        </div>

        {/* Product */}
        <div className=' bg-amber-300'>
        product
        </div>

      </div>

    </section>
  )
}

export default ProductListPage