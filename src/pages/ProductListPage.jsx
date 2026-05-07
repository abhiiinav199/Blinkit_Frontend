import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import axios from "../utils/axios"
import { SummaryApi } from '../common/SummaryApi'
import { useEffect } from 'react'

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setpage] = useState(1)
  const [loading, setloading] = useState(false)
  const [totalPage, settotalPage] = useState(1)
  const params = useParams()
  const { category, subCategory } = params

  const categoryId = category.split("-").slice(-1)[0]
  const subCategoryId = subCategory.split("-").slice(-1)[0]
  // console.log(category.split("-")
  // .slice(0, -1) // last ID remove
  // .join(" ")
  // .trim())
  console.log(category
  .split("-")
  .slice(0, -1)
  .map(item => item.trim())
  .join(" "))

  const subCategoryName= category.split("-")

  const fetchProductByCategoryAndSubCategory = async () => {
    try {
      setloading(true)
      const res = await axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10
        }
      })

      const { data: responseData } = res
      console.log(responseData)
      if (responseData?.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        settotalPage(responseData.totalCount)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    fetchProductByCategoryAndSubCategory()
  }, [params])

  return (
    <section className="min-h-[78vh] mt-3 sm:mt-0 sticky top-26 lg:top-20">
      <div className='container sticky top-26 mx-auto grid grid-cols-[80px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]'>
        {/* Sub Category */}
        <div className=' bg-green-400 min-h-[78vh] '>
          sub category
        </div>

        {/* Product */}
        <div className=' '>
          <div className='bg-white shadow-md P-2'>
            <h3>{subCategoryName}</h3>
          </div>
        </div>

      </div>

    </section>
  )
}

export default ProductListPage