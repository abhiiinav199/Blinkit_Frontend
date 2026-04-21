import { SummaryApi } from "../common/SummaryApi"
import axios from "../utils/axios"

 const uploadImage= async (image) =>{
    try {
        const formData = new FormData()
        formData.append('image' , image)
        const res = await axios({
            ...SummaryApi.uploadImage,
            data: formData
        })
        return res?.data
    } catch (error) {
        return error
    }
}


export default uploadImage