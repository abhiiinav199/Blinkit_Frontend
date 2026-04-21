import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Divider from "./Divider"
import axios from "../utils/axios"
import { SummaryApi } from "../common/SummaryApi"
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
import { logout } from "../Slice/userSlice"
import { HiOutlineExternalLink } from "react-icons/hi"
import IsAdmin from "../utils/IsAdmin"

const UsersMenu = ({ close }) => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleLogout = async () => {
        try {
            const res = await axios({
                ...SummaryApi.logout,
            })
            const { success, message } = res.data

            if (success) {
                if (close) {
                    close()
                }
                dispatch(logout())
                toast.success(message)
                localStorage.clear()
                // navigate("/")
                window.history.back()
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleClose = () => {
        if (close) {
            close()
        }
    }
    return (
        <div >
            <div className="font-semibold ">
                My Account
            </div>
            <div className="text-sm flex items-center gap-2 mt-2" >
                <span className="max-w-52 text-ellipsis line-clamp-1">{user?.name || user?.mobile}</span>
                <span className="text-red-500 font-bold">{user.role === "ADMIN" ? "(Admin)" : ""}</span>
                <Link onClick={handleClose} to={"/dashboard/profile"} className="hover:text-primary-200"><HiOutlineExternalLink size={15}/>
                </Link>
                
                </div>

            <Divider />

            <div className="text-sm grid gap-2">

                {
                    IsAdmin(user?.role) &&(
                    <>

                    <Link onClick={handleClose} to={"/dashboard/category"} className="py-1 px-2 hover:bg-orange-200"> Category </Link>

                     <Link onClick={handleClose} to={"/dashboard/subcategory"} className="py-1 px-2 hover:bg-orange-200"> Sub Category </Link>

                       <Link onClick={handleClose} to={"/dashboard/upload-product"} className="py-1 px-2 hover:bg-orange-200"> Upload Product</Link>
                <Link onClick={handleClose} to={"/dashboard/product"} className="py-1 px-2 hover:bg-orange-200">Product</Link>
                    
                    </>
                    
                )
                }


               
               
              
                <Link onClick={handleClose} to={"/dashboard/myorders"} className="py-1 px-2 hover:bg-orange-200">My Orders</Link>
                <Link onClick={handleClose} to={"/dashboard/address"} className="px-2 py-1 hover:bg-orange-200">Save Address</Link>
                <button onClick={handleLogout} className="text-center bg-red-200 cursor-pointer px-2 py-1 ">Logout</button>
            </div>
        </div>
    )
}

export default UsersMenu