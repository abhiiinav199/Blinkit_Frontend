import { createContext, useContext, useEffect, useState } from "react";
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
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)

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

    const updateCartItem = async (id, qty) => {
        try {
            const res = await axios({
                ...SummaryApi.updateCartItem,
                data: {
                    _id: id,
                    qty: qty
                }
            })

            const { data: responseData } = res
            const { success, message } = responseData

            if (success) {
                // toast?.success(message)
                fetchCartItem()
            }

            return responseData

        } catch (error) {
            // AxiosToastError(error)
        }
    }
    const deleteCartItem = async (cartId) => {
        try {
            const res = await axios({
                ...SummaryApi.deleteCartItem,
                data: {
                    _id: cartId
                }
            })

            const { data: responseData } = res
            const { success } = responseData

            if (success) {
                // toast?.success(message)
                fetchCartItem()
            }

            return responseData

        } catch (error) {
            // AxiosToastError(error)
        }
    }

    useEffect(() => {
        fetchCartItem()
        updateCartItem()
        deleteCartItem()
    }, [])

    return (
        <GlobalContext.Provider value={{ fetchCartItem, updateCartItem, deleteCartItem, totalPrice, setTotalPrice, totalQty, setTotalQty }}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider