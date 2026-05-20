import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import { SummaryApi } from '../common/SummaryApi'
import axios from "../utils/axios"
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'


const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [search, setSearch] = useState("")

  const loadingArrayCard = new Array(10).fill(null)

  const fetchData =async() =>{
    try {
      setLoading(true)
      const res = await axios({
        ...SummaryApi.searchProduct,
        data: {
          search: ""
        }
      })
      const {data, success, totalPage} = res?.data
      if(success){
        if(page === 1){
          setData(data)

        }
        else{
          setData(prev => [...prev, ...data])
        }
        console.log("searchPage",res)
        setTotalPage(totalPage)
      }
    } catch (error) {
      AxiosToastError(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className='min-h-[78vh] bg-white'>
      <section className=''>

        <div className='container mx-auto p-4'>
          <p className='font-semibold'>Search Results: {data?.length}</p>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>

              {
                 data?.map((item,index)=>(
                  <CardProduct key={item._id+ "search" +index} data={item} loading={false}/>
                 )) 
              }


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

