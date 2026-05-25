import { createContext, useContext, useEffect } from "react";
import { setCartItem } from "../Slice/cartSlice";
import { useDispatch } from "react-redux";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import axios from "../utils/axios"


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
                AxiosToastError(error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCartItem()
    }, [])

    return (
        <GlobalContext.Provider value={{fetchCartItem}}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider