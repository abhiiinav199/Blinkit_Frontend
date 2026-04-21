import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import AxiosToastError from "../utils/AxiosToastError"
import axios from "../utils/axios"
import { SummaryApi } from "../common/SummaryApi"

const ResetPassword = () => {

  const [data, setdata] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [showPassword, setshowPassword] = useState(false)
  const [showCofirmPassword, setshowCofirmPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const  success  = location?.state?.data?.success 
  const { email } = location?.state || {}

  const vallidateValue = Object.values(data).every(el => el) // Manual check for specific fields (more readable for forms)  const validateValue = data.name && data.email && data.password;


  useEffect(() => {
    if (!success) {
      navigate("/reset-password")
    }

    if (email) {
      setdata((prev) => ({
        ...prev,
        email: email,
      }))
    }
  }, [])

  const handlechange = (e) => {
    const { name, value } = e.target

    setdata((prev) => (
      {
        ...prev,
        [name]: value
      }

    ))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(data.newPassword !== data.confirmPassword){
      toast.error("Password does not match")
      return
    }
    try {
      const res = await axios({
        ...SummaryApi.reset_password,
        data: data
      })
      if (res.data.error) {
        toast.error(res.data.message)
      }
      if (res.data.success) {
        toast.success(res.data.message)

        navigate("/login")

        setdata({
          email: "",
          newPassword: "",
          confirmPassword: ""
        })

        console.log(data)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }


  console.log("resetpassword page", data)


  return (
    <section className='min-h-[78vh] w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className="bg-secondary-200 text-lg align-center text-center font-bold px-2 tracking-wide py-2">Enter Your New Password</p>

        <form className='grid gap-4 mt-6'>
          <div className='grid gap-1'>
            <label htmlFor="newPassword">New Password:</label>

            <div className='flex items-center bg-blue-50 p-2  border rounded focus-within:border-primary-200'>
              <input
                type={showPassword ? "text" : "password"}
                id='newPassword'
                className='w-full bg-white outline-none'
                name='newPassword'
                value={data.newPassword}
                onChange={handlechange}
                placeholder='Enter your password'
              />
              <div className='cursor-pointer' onClick={() => { setshowPassword(prev => !prev) }}>
                {
                  showPassword ? (
                    <FaRegEye />
                  ) : (
                    <FaRegEyeSlash />
                  )
                }

              </div>
            </div>

          </div>

          <div className='grid gap-1'>
            <label htmlFor="confirmPassword">Confirm Password:</label>

            <div className='flex items-center bg-blue-50 p-2  border rounded focus-within:border-primary-200'>
              <input
                type={showCofirmPassword ? "text" : "password"}
                id='confirmpassword'
                className='w-full bg-white outline-none'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handlechange}
                placeholder='Enter your same password here'
              />
              <div className='cursor-pointer' onClick={() => { setshowCofirmPassword(prev => !prev) }}>
                {
                  showCofirmPassword ? (
                    <FaRegEye />
                  ) : (
                    <FaRegEyeSlash />
                  )
                }

              </div>
            </div>
            <Link to={"/forgot-password"} className="block ml-auto hover:text-primary-200">Forgot Password</Link>
          </div>

          <button disabled={!vallidateValue} className={`${vallidateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2  rounded font-semibold my-3 tracking-wide cursor-pointer`} onClick={handleSubmit}>Change Password</button>

        </form>

        <p>
          Already have an account ? <Link className='p-2 bg-amber-400 hover:bg-amber-300 font-semibold rounded-lg text-green-900 hover:text-green-800' to={"/login"}>Login</Link>
        </p>

      </div>
    </section>
  )
}

export default ResetPassword