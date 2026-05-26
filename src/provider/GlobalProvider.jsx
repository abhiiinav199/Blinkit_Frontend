import { createContext, useContext, useEffect } from "react";
import { setCartItem } from "../Slice/cartSlice";
import { useDispatch } from "react-redux";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import axios from "../utils/axios"
import toast from "react-hot-toast";


export const GlobalContext = createContext(null)

export const useGlobalContext = () => useContext(GlobalContext)


const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch()

    const fetchCartItem = async () => {
        try {
            const res = await axios({
                ...SummaryApi.getCartItem
            })
            const { data: responseData } = res
            const { success, error } = responseData
            if (success) {
                dispatch(setCartItem(responseData?.data))
            }
            else {
                // AxiosToastError(error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateCartItem = async(id, qty) =>{
        try {
            const res = await axios({
                ...SummaryApi.updateCartItem,
                data:{
                    _id : id,
                    qty: qty
                }
            })

            const {data : respsonseData} = res
            const {success, message} = respsonseData

            if(success){
                toast.success(message)
                fetchCartItem()
            }
        } catch (error) {
            // AxiosToastError(error)
        }
    }

    useEffect(() => {
        fetchCartItem()
        updateCartItem()
    }, [])

    return (
        <GlobalContext.Provider value={{fetchCartItem, updateCartItem}}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider