import React, { useState } from 'react'
import CardLoading from '../components/CardLoading'

const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadingArrayCard = new Array(10).fill(null)


  return (
    <div className='min-h-[78vh] bg-white'>
      <section className=''>

        <div className='container mx-auto p-4'>
          <p className='font-semibold'>Search Results: {data?.length}</p>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>


            {/* loading data */}
            {
              loading && (
                loadingArrayCard?.map((_, index) => {
                  return (
                    <CardLoading key={"loadingsearchpage" + index} />
                  )
                })
              )
            }
          </div>

        </div>

      </section>
    </div>
  )
}

export default SearchPage

