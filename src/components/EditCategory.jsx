import {useState} from 'react'
import { IoClose } from 'react-icons/io5'
import uploadImage from '../utils/UploadImage'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import axios from '../utils/axios'
import { SummaryApi } from '../common/SummaryApi'

const EditCategory = ({ close , fetchData,data : CategoryData}) => {


  const [data, setData] = useState({
    _id: CategoryData?._id,
    name: CategoryData?.name,
    image: CategoryData?.image,
  })
  const [loading, setloading] = useState(false)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    // console.log("Submitting Data" , data)
    e.preventDefault()
    try {
      setloading(true)
      const res = await axios({
        ...SummaryApi.updateCategory,
        data: data
      })
      const { data: responseData } = res
      const { success, message } = responseData
      if (success) {
        toast.success(message)
        close()
        fetchData()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setloading(false)
    }

  }

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    try {
      setloading(true)
      const uploadedImage = await uploadImage(file)
      const { url } = uploadedImage?.data
      if (uploadedImage.success) {
        toast.success(uploadedImage?.message)
        setData((prev) => {
          return {
            ...prev,
            image: url
          }
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setloading(false)
    }


  }
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 flex items-center justify-center'>
      <div className='bg-white max-w-4xl w-full p-4 rounded'>
        <div className='flex items-center justify-between'>
          <h1 className='font-semibold text-xl'>Update Category</h1>
          <button
            onClick={close}
            className='text-neutral-800 w-fit block ml-auto cursor-pointer'>
            <IoClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='my-3 grid gap-2'>

          <div className='grid gap-1'>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id='name'
              name="name"
              value={data.name}
              placeholder='Enter your name'
              className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
              onChange={handleOnChange}
            />
          </div>

          <div className='grid gap-1'>
            <p>Image</p>
            <div className='flex gap-4 flex-col lg:flex-row items-center'>
              <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded '>

                {
                  data?.image ? (
                    <img className='w-full- h-full object-scale-down'
                      src={data?.image} alt="category" />
                  ) : (

                    <p className='text-sm'>No Image</p>
                  )
                }
              </div>

              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
                       ${!data.name ? "bg-gray-300" : "border-primary-200"}
                       ${!data.name ? "cursor-not-allowed" : "cursor-pointer"}
                       px-4 py-2 rounded border hover:bg-primary-100 font-medium
                     `}
                >
                  {
                    loading ? "Loading..." : "Upload Image"
                  }
                </div>
                <input
                    onChange={handleUploadCategoryImage}
                    type="file"
                    id='uploadCategoryImage'
                    className='hidden'
                    disabled={!data.name}
                  />
              </label>
            </div>
          </div>

          <button type='submit' className={`${data?.name && data?.image ? "bg-primary-200" : "bg-gray-300"}
             py-2 font-semibold hover:bg-primary-100  ${!data.name ? "cursor-not-allowed" : "cursor-pointer"}
             `}
            disabled={!(data?.name && data?.image)}>
            Update Category</button>

        </form>
      </div>
    </section>
  )
}

export default EditCategory