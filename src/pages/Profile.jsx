import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa"
import UserProfileAvataredit from '../components/UserProfileAvataredit'
import { useEffect, useState } from 'react'
import axios from "../utils/axios"
import { SummaryApi } from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { setUserDetails } from '../Slice/userSlice'
import fetchUserDetails from '../utils/fetchUserDetails'

const Profile = () => {
    const user = useSelector((state) => state.user)
    const [openProfileAvatarEdit, setopenProfileAvatarEdit] = useState(false)
    const [userData, setuserData] = useState({
        name: user?.name || "",
        email: user?.email | "",
        mobile: user?.mobile || "" ,
    })
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()

    const handleOnChange = (e) => {
        const { name, value } = e.target
        // console.log(name, value)
 
        setuserData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setloading(true)

            const res =await axios({
                ...SummaryApi.updateUserDetails,
                data: userData
            })

            const { data: responseData } = res
            if (responseData.success) {
                toast.success(responseData.message)
                 try {
                    const userData = await fetchUserDetails()
                    const {data} = userData
                
                    dispatch(setUserDetails(data))
                
                    } catch (error) {
                      AxiosToastError(error)
                    }
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        setuserData({
            name: user?.name || "",
            email: user?.email || "",
            mobile: user?.mobile || ""
        })
    }, [user])


    return (
        <div>

            {/* Profile Upload and Display Image */}
            <div className='w-20 h-20  flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                {
                    user?.avatar ? (
                        <img src={user?.avatar} alt={user?.name} />
                    ) : (

                        <FaRegUserCircle size={65} />
                    )
                }
            </div>

            <button onClick={() => setopenProfileAvatarEdit(true)} className='cursor-pointer min-w-20 text-sm border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-2'>
                Edit
            </button>

            {
                openProfileAvatarEdit && (
                    <UserProfileAvataredit close={() => setopenProfileAvatarEdit(false)} />
                )
            }


            {/* name, mobile, email, change passowrd */}
            <form className='my-4 grid gap-4' onSubmit={handleSubmit}>

                <div className="grid ">
                    <label htmlFor='name'>
                        Name
                    </label>
                    <input
                        type="text"
                        id='name' //connected with label htmlFor
                        name="name" //connected with handleOnChange
                        value={userData.name}  //connectd with useState and value coming from redux store
                        placeholder='Enter your name'
                        className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded-lg '
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <div className="grid ">
                    <label htmlFor='email'>
                        Email
                    </label>
                    <input
                        type="text"
                        id='email' //connected with label htmlFor
                        name="email" //connected with handleOnChange
                        value={userData.email}  //connectd with useState and value coming from redux store
                        placeholder='Enter your email'
                        className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded-lg '
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <div className="grid ">
                    <label htmlFor='mobile'>
                        Mobile
                    </label>
                    <input
                        type="text"
                        id='mobile' //connected with label htmlFor
                        name='mobile' //connected with handleOnChange
                        value={userData.mobile}  //connectd with useState and value coming from redux store
                        placeholder='Enter your mobile no'
                        className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded-lg '
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <button className='border border-primary-00 text-primary-200 hover:text-neutral-800 px-4 py-2 font-semidbold hover:bg-primary-100 cursor-pointer rounded font-semibold' type="submit">
                    {loading ? "Loading..." : "Submit"}
                </button>

            </form>
        </div>
    )
}

export default Profile