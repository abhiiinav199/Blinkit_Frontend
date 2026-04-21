import axios from "axios"
import { baseURL, SummaryApi } from "../common/SummaryApi"

const instance= axios.create({
    baseURL: baseURL,
    withCredentials: true

})
// instance.interceptors.
// .use(async(config) =>{
//     const accessToken = localStorage.getItem("accessToken")
//     if(accessToken){
//         config.headers.Authorization = `Bearer ${accessToken}`
//     }
//     return config
// },
// (error) => {
//     return Promise.reject(error)
// })

// //extend the life span of accessToken with the help of refreshToken
// instance.interceptors.request.use((res) =>{
//     return res
// },async(error )=>{
//     let originalRequest = error.config
//     if(error.response.status === 401 && !originalRequest.retry ){

//         originalRequest.retry= true

//         const refreshToken = localStorage.getItem("refreshToken")

//         if(refreshToken){
//             const newAccessToken = await refreshAccessToken(refreshToken)
//             if(newAccessToken){
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
//                 return instance(originalRequest)
//             }
//         }
//     }
//     return Promise.reject(error)  
// }
// )



//sending access token in the headers
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
},
  (error) => Promise.reject(error)
)


// //extend the life span of accessToken with the help of refreshToken
instance.interceptors.response.use(
  (response) =>{return  response},

  async (error) => {
    const originalRequest = error.config 
    
    if (error.response?.status === 401 && !originalRequest.retry) { //by default originalRequest.retry is false thats why we are making it true with !originalRequest.retry it means originalRequest.retry is false then it will make it true
      originalRequest.retry = true
      
      const refreshToken = localStorage.getItem("refreshToken")
      
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken)

        if (newAccessToken) {
          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`

          return instance(originalRequest)
        }
      }
    }
    
    return Promise.reject(error)
}
)

const refreshAccessToken = async (refreshToken) =>{
    try {
        const res = await axios({
            ...SummaryApi.refresh_token,
            headers:{
                Authorization: `Bearer ${refreshToken}`
            }
        }) 
       
        const {accessToken}  = res?.data?.data
        localStorage.setItem("accessToken", accessToken)
        return accessToken
    } catch (error) {
        console.log(error)
    }
}

export default instance