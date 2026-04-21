
import toast from 'react-hot-toast'
import axios from "../utils/axios"
import { SummaryApi } from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from "react"

const OtpVerification = () => {
    const [data, setdata] = useState(["", "" , "" , "" , "" , ""])
    const navigate = useNavigate()
    const inputRef=  useRef([])
    const location =useLocation()
    const {email} = location.state
    // console.log(email)
 
    useEffect(()=>{
        if(!email){
            navigate("/forgot-password")
        }
    },[])


    const vallidateValue = data.every(el => el) // Manual check for specific fields (more readable for forms)  const validateValue = data.name && data.email && data.password;


    const handleChange = (e,index) =>{
        const value = e.target.value
        const newData = [...data]
        newData[index] = value
        setdata(newData)
        if(value && index< 5){
            inputRef.current[index+1].focus()
        }
        if(!value && index>0){
            inputRef.current[index-1].focus()
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(""),
                    email : email
                }
            })
          if(res.data.error){
            toast.error(res.data.message)
          }
          if(res.data.success){
            toast.success(res.data.message)

            setdata(["", "" , "" , "" , "" , ""])

            navigate("/reset-password",{state:{
                data: res.data,
                email: email
            }})
          }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className='min-h-[78vh] w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className="bg-secondary-200 text-lg align-center text-center font-bold px-2 tracking-wide py-2">Enter OTP</p>

                <form className='grid gap-4 mt-6'>
                    <div className='grid gap-1'>
                        <label htmlFor="otp">Enter Your OTP : </label>
                        <div className="flex items-center gap-2 justify-between">
                            {
                                data.map((elem, index) =>(
                                     <input
                                     key={index}
                            type="text"
                            ref={(ref) =>{
                               inputRef.current[index] = ref
                               return ref
                            }}
                            maxLength={1}
                            value={data[index]}
                            onChange={(e)=>handleChange(e, index)}
                            className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 mt-3 text-center font-semibold'
                        />
                                ))
                            }
                        </div>
                    </div>

                    <button disabled={!vallidateValue} className={`${vallidateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`} onClick={handleSubmit}>Verify Otp</button>

                </form>

                <p>
                    Already have an account ? <Link className='p-2 bg-amber-400 hover:bg-amber-300 font-semibold rounded-lg text-green-900 hover:text-green-800' to={"/login"}>Login</Link>
                </p>

            </div>
        </section>
    )
}

export default OtpVerification