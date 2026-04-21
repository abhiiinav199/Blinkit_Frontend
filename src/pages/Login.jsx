import { FaRegEyeSlash } from "react-icons/fa6"
import { FaRegEye } from "react-icons/fa6"
import toast from 'react-hot-toast'
import axios from "../utils/axios"
import { SummaryApi } from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import fetchUserDetails from "../utils/fetchUserDetails"
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../Slice/userSlice'



const Login = () => {
    const [data, setdata] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setshowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch= useDispatch()

    const handlechange = (e) => {
        const { name, value } = e.target

        setdata((prev) => (
            {
                ...prev,
                [name]: value
            }

        ))
    }

    const vallidateValue = Object.values(data).every(el => el) // Manual check for specific fields (more readable for forms)  const validateValue = data.name && data.email && data.password;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios({
                ...SummaryApi.login,
                data: data
            })

            // console.log(res)

          if(res.data.error){
            toast.error(res?.data?.message)
          }
          if(res.data.success){
            const {accessToken} = res?.data?.data
            const {refreshToken} = res?.data?.data
            

            toast.success(res?.data?.message)

            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken" , refreshToken)

            const userDetails = await fetchUserDetails()
                const {data} = userDetails
                dispatch(setUserDetails(data))
                // console.log("usedetails from Login.jsx filw",data)
            
            
            setdata({
                email: "",
                password: "",
            })
            navigate("/")
          }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className='min-h-[78vh] w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p>Login</p>

                <form className='grid gap-4 mt-6'>
                    <div className='grid gap-1'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id='email' //connected with label htmlFor
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                            name='email' //connected with handleOnChange
                            value={data.email} //connectd with useState
                            onChange={handlechange}
                            placeholder='Enter your email'
                        />
                    </div>
                    
                    <div className='grid gap-1'>
                        <label htmlFor="password">Password:</label>

                        <div className='flex items-center bg-blue-50 p-2  border rounded focus-within:border-primary-200'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full bg-white outline-none'
                                name='password'
                                value={data.password}
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
                        <Link to={"/forgot-password"} className="block ml-auto hover:text-primary-200">Forgot Password</Link>
                    </div>

                    


                    <button disabled={!vallidateValue} className={`${vallidateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2  rounded font-semibold my-3 tracking-wide cursor-pointer`} onClick={handleSubmit}>Login</button>

                </form>

                <p className="grid sm:block">
                    Don't have a account ? <Link className='p-2 bg-amber-400  hover:bg-amber-300 font-semibold rounded-lg w-min  text-green-900 hover:text-green-800' to={"/register"}>Register</Link>
                </p>
            </div>
        </section>
    )
}

export default Login 