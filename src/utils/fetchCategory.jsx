import axios from "./axios"
import { SummaryApi } from "../common/SummaryApi"

const fetchCategory = async() => {
      try {
           
            const res = await axios({
              ...SummaryApi.getCategory
            })
           return res?.data
          } catch (error) {
          
          } 
}

export default fetchCategory