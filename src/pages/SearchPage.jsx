import React, { useState } from 'react'

const SearchPage = () => {
  const [data, setData] = useState([])
  return (
    <div className='min-h-[78vh]'>
      <section>

        <div className='container mx-auto p-4'>
          <p className='font-semibold'>Search Results: {data?.length}</p>
        </div>

      </section>
    </div>
  )
}

export default SearchPage

 