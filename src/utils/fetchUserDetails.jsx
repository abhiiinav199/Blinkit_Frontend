import { SummaryApi } from "../common/SummaryApi"
import axios from "./axios"
const fetchUserDetails = async  () => {

    try {
        const res= await axios({
            ...SummaryApi.user_details
        })

        return res?.data
    } catch (error) {
        
        // console.log(error)
    }

 
}

export default fetchUserDetails