import  axios  from "../utils/axios"
import { useState } from "react"
import { FaRegUserCircle } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { SummaryApi } from "../common/SummaryApi"
import AxiosToastError from "../utils/AxiosToastError"
import { updatedAvatar } from "../Slice/userSlice"
import { IoClose } from "react-icons/io5"
import toast from "react-hot-toast"

const UserProfileAvataredit = ({close}) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [loading, setloading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handleUploadAvatarImage =async (e) =>{
    const file=  e.target.files[0]

    if(!file){
      return
    }
    
    const formData= new FormData()
    formData.append('avatar' , file)
    
    try {
      setloading(true)
        const res = await axios({
      ...SummaryApi.uploadAvatar,
      data: formData
    })
      const {data : responseData} = res
      dispatch(updatedAvatar(responseData?.data?.avatar))
      // console.log(responseData)
      toast.success(responseData?.message)
    } catch (error) {
      AxiosToastError(error)
    } finally{
      setloading(false)
    }

  }
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60 p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">

        <button onClick={close} className="text-neutral-800 w-fit block ml-auto cursor-pointer">
          <IoClose size={20}/> 
        </button>

        <div className='w-20 h-20  flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
          {
            user?.avatar ? (
              <img src={user?.avatar} alt={user?.name} />
            ) : (

              <FaRegUserCircle size={65} />
            )
          }
        </div>


        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div  className="border my-3 border-primary-200 active:scale-95 hover:bg-primary-100 cursor-pointer px-4 py-1 rounded text-sm">
              {
                loading ? "Loading..." : "Upload"
              }
              </div>
          </label>
          <input onChange={handleUploadAvatarImage} type="file" id="uploadProfile" className="hidden" />
        </form>

      </div>
    </section>
  )
}

export default UserProfileAvataredit