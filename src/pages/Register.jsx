import { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6"
import { FaRegEye } from "react-icons/fa6"
import toast from 'react-hot-toast'
import axios from "../utils/axios"
import { SummaryApi } from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)
    const navigate = useNavigate()

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
        if (data.password !== data.confirmPassword) {
            toast.error("Password and confirm password must be same")
            return
        }
        

        try {
            const res = await axios({
                ...SummaryApi.register,
                data: data
            })
          if(res.data.error){
            toast.error(res.data.message)
          }
          if(res.data.success){
            toast.success(res.data.message)
            setdata({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
            navigate("/login")
          }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className='min-h-[78vh] w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p>Welcome to Blinkeyit</p>

                <form className='grid gap-4 mt-6'>
                    <div className='grid gap-1'>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            autoFocus
                            id='name'
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                            name='name'
                            value={data.name}
                            onChange={handlechange}
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id='email'
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                            name='email'
                            value={data.email}
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
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor="confirmPassword">Confirm Password:</label>

                        <div className='flex items-center bg-blue-50 p-2  border rounded focus-within:border-primary-200'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                className='w-full bg-white outline-none'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handlechange}
                                placeholder='Enter your confirm password'
                            />
                            <div className='cursor-pointer' onClick={() => { setshowConfirmPassword(prev => !prev) }}>
                                {
                                    showConfirmPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }

                            </div>
                        </div>
                    </div>


                    <button disabled={!vallidateValue} className={`${vallidateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2  rounded font-semibold my-3 tracking-wide cursor-pointer`} onClick={handleSubmit}>Register</button>

                </form>

                <p>
                    Already have account ? <Link className='p-2 bg-amber-400 hover:bg-amber-300 font-semibold rounded-lg text-green-900 hover:text-green-800' to={"/login"}>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default Register