import { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import axios from '../utils/axios'
import { SummaryApi } from '../common/SummaryApi'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'
import {  useSelector } from 'react-redux'

const CategoryPage = () => {
  const [openUploadCategory, setopenUploadCategory] = useState(false)
  const [loading, setloading] = useState(false)
  const [categoryData, setcategoryData] = useState([])
  const [openEdit, setopenEdit] = useState(false)
  const [editData, seteditData] = useState({
    name: "",  
    image: "",
  })

  const [openConfirmBoxDelete, setopenConfirmBoxDelete] = useState(false)

  const [deleteCategory, setdeleteCategory] = useState({
    _id: ""
  })

 

  const allCategory= useSelector(state => state?.product?.allCategory)
 

  useEffect(() => {
    setcategoryData(allCategory)
  }, [allCategory])

  

  // instead of calling fetchCategory function we are using useSelector to get the data from the store and fetching this function in app.jsx
  //dont remove this function or it will stop working
  const fetchCategory = async () => {
    try {
       setloading(true)
      const res = await axios({
        ...SummaryApi.getCategory
      })
      const { data: responseData } = res
      const { success, data } = responseData
      if (success) {
        setcategoryData(data)

      }
      // console.log(responseData)
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setloading(false)
    }
  }
  useEffect(() => {
    fetchCategory()
  }, [])

  const handleDeleteCategory = async () => {
    try {
      setloading(true)
      const res = await axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory
      })
      const { data: responseData } = res
      const { success } = responseData
      if (success) {
        toast.success(responseData.message)
      
        fetchCategory()
        setopenConfirmBoxDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setloading(false)
    }
  }
  return (
    <section>
      <div className='mt-2 py-2  bg-whote bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={() => setopenUploadCategory(true)} className='text-sm border-primary-200 hover:bg-primary-200 px-3 py-1 cursor-pointer rounded'>Add Category</button>
      </div>

      {
        !categoryData[0] && !loading && (
          <NoData />
        )
      }

      <div className='p-4 grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-2'>
        {
          categoryData.map((item, index) => (
            <div key={item._id} className='w-32 h-56 object-scale-down overflow-hidden rounded shadow-md group'>


              <img className='w-full object-scale-down ' src={item?.image} alt={item?.name} />

              <div className='hidden group-hover:flex items-center h-9 gap-1 '>

                <button onClick={() => {
                  setopenEdit(true)
                  seteditData(item)
                }} className='flex-1 cursor-pointer bg-green-100 hove:bg-green-200 active:scale-95 text-green-600 font-medium py-1 rounded '>Edit</button>

                <button onClick={() => {
                  setopenConfirmBoxDelete(true)
                  setdeleteCategory(item)
                }}
                  className='flex-1 cursor-pointer pointer bg-red-100 hover:bg-red-200 active:scale-95 text-red-600 font-medium py-1 rounded'>Delete</button>

              </div>
            </div>
          ))
        }
      </div>

      {loading && (<Loading />)}


      {
        openUploadCategory && (
          <UploadCategoryModel fetchData={fetchCategory} close={() => setopenUploadCategory(false)} />
        )
      }


      {
        openEdit && (
          <EditCategory data={editData} fetchData={fetchCategory} close={() => setopenEdit(false)} />
        )
      }

      {
        openConfirmBoxDelete && (
          <ConfirmBox close={() => setopenConfirmBoxDelete(false)} cancel={() =>setopenConfirmBoxDelete(false) } confirm={handleDeleteCategory} />
        )
      }
    </section>
  )
}

export default CategoryPage